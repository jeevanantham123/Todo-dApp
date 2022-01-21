import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../Utils/constants";

export const TaskContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tasksContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return tasksContract;
};

export const TasksProvider = ({ children }) => {
  const [todo, settodo] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [Tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const getAllTasks = async (accoundId) => {
    try {
      if (ethereum) {
        const tasksContract = createEthereumContract();
        const availableTasks = await tasksContract.getTasks();
        const structuredTasks = availableTasks
          .filter((task) => {
            return task.sender.toLowerCase() == accoundId;
          })
          .map((task) => {
            return task.content;
          });
        console.log(structuredTasks);
        setTasks(structuredTasks);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTasks(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTasksExists = async () => {
    try {
      if (ethereum) {
        const tasksContract = createEthereumContract();
        const currentTransactionCount =
          await tasksContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const tasksContract = createEthereumContract();
        const taskHash = await tasksContract.createTask(currentAccount, todo);
        setIsLoading(true);
        settodo("");
        console.log(`Loading - ${taskHash.hash}`);
        await taskHash.wait();
        console.log(`Success - ${taskHash.hash}`);
        setIsLoading(false);
        const tasksCount = await tasksContract.getTransactionCount();
        setTransactionCount(tasksCount.toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTasksExists();
  }, [transactionCount, currentAccount]);

  return (
    <TaskContext.Provider
      value={{
        transactionCount,
        connectWallet,
        Tasks,
        todo,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
