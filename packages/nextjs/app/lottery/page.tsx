"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { Address, AddressInput, EtherInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const LotteryPage: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [newWinner, setNewWinner] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [newServer, setNewServer] = useState("");

  // Read contract data
  const { data: owner } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "owner",
  });

  const { data: server } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "server",
  });

  const { data: winner } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "winner",
  });

  const { data: prizeClaimed } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "prizeClaimed",
  });

  const { data: balance } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "getBalance",
  });

  // Get contract address
  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "ServerLottery" });

  // Write contract functions
  const { writeContractAsync: setWinner } = useScaffoldWriteContract({
    contractName: "ServerLottery",
  });

  const { writeContractAsync: sendPrize } = useScaffoldWriteContract({
    contractName: "ServerLottery",
  });

  const { writeContractAsync: setServer } = useScaffoldWriteContract({
    contractName: "ServerLottery",
  });

  // Use useSendTransaction for sending funds to the contract
  const { sendTransactionAsync } = useSendTransaction();

  // Check roles
  const isOwner = connectedAddress === owner;
  const isServer = connectedAddress === server;
  const isWinner = connectedAddress === winner;

  const handleSetWinner = async () => {
    if (!newWinner) return;
    try {
      await setWinner({
        functionName: "setWinner",
        args: [newWinner],
      });
      setNewWinner("");
    } catch (error) {
      console.error("Error setting winner:", error);
    }
  };

  const handleSendPrize = async () => {
    try {
      await sendPrize({
        functionName: "sendPrize",
      });
    } catch (error) {
      console.error("Error sending prize:", error);
    }
  };

  const handleSetServer = async () => {
    if (!newServer) return;
    try {
      await setServer({
        functionName: "setServer",
        args: [newServer],
      });
      setNewServer("");
    } catch (error) {
      console.error("Error setting server:", error);
    }
  };

  const handleSendFunds = async () => {
    if (!fundAmount || !deployedContractData) return;
    try {
      await sendTransactionAsync({
        to: deployedContractData.address,
        value: parseEther(fundAmount),
      });
      setFundAmount("");
    } catch (error) {
      console.error("Error sending funds:", error);
    }
  };

  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="px-5 w-full max-w-4xl">
        <h1 className="text-center">
          <span className="block text-4xl font-bold">🎰 Server Lottery</span>
          <span className="block text-lg mt-2">Gestiona tu lotería descentralizada</span>
        </h1>

        {/* Contract Info */}
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">📊 Información del Contrato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-bold">👑 Owner:</span>
              <Address address={owner} />
            </div>
            <div>
              <span className="font-bold">🖥️ Server:</span>
              <Address address={server} />
            </div>
            <div>
              <span className="font-bold">🏆 Winner:</span>
              {winner && winner !== "0x0000000000000000000000000000000000000000" ? (
                <Address address={winner} />
              ) : (
                <span className="text-gray-500">No hay ganador</span>
              )}
            </div>
            <div>
              <span className="font-bold">💰 Balance:</span>
              <span className="ml-2">{balance ? `${Number(balance) / 1e18} ETH` : "0 ETH"}</span>
            </div>
            <div>
              <span className="font-bold">🎁 Premio Reclamado:</span>
              <span className={`ml-2 ${prizeClaimed ? "text-red-500" : "text-green-500"}`}>
                {prizeClaimed ? "Sí" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* User Role Display */}
        <div className="bg-base-200 rounded-xl p-4 mt-6">
          <h3 className="font-bold mb-2">🔑 Tu Rol:</h3>
          <div className="flex gap-2">
            {isOwner && <span className="badge badge-primary">Owner</span>}
            {isServer && <span className="badge badge-secondary">Server</span>}
            {isWinner && <span className="badge badge-accent">Winner</span>}
            {!isOwner && !isServer && !isWinner && <span className="badge badge-ghost">Usuario Regular</span>}
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Send Funds */}
          <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-6">
            <h3 className="text-xl font-bold mb-4">💸 Enviar Fondos</h3>
            <div className="space-y-4">
              <EtherInput placeholder="Cantidad en ETH" value={fundAmount} onChange={setFundAmount} />
              <button
                className="btn btn-primary w-full"
                onClick={handleSendFunds}
                disabled={!fundAmount || !deployedContractData}
              >
                Enviar Fondos
              </button>
            </div>
          </div>

          {/* Set Winner (Only Server) */}
          {isServer && (
            <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-6">
              <h3 className="text-xl font-bold mb-4">🏆 Designar Ganador</h3>
              <div className="space-y-4">
                <AddressInput placeholder="Dirección del ganador" value={newWinner} onChange={setNewWinner} />
                <button
                  className="btn btn-secondary w-full"
                  onClick={handleSetWinner}
                  disabled={!newWinner || prizeClaimed}
                >
                  Designar Ganador
                </button>
              </div>
            </div>
          )}

          {/* Claim Prize (Only Winner) */}
          {isWinner && !prizeClaimed && winner !== "0x0000000000000000000000000000000000000000" && (
            <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-6">
              <h3 className="text-xl font-bold mb-4">🎁 Reclamar Premio</h3>
              <p className="mb-4">¡Felicidades! Puedes reclamar tu premio.</p>
              <button className="btn btn-accent w-full" onClick={handleSendPrize}>
                Reclamar Premio
              </button>
            </div>
          )}

          {/* Set Server (Only Owner) */}
          {isOwner && (
            <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-6">
              <h3 className="text-xl font-bold mb-4">🖥️ Cambiar Servidor</h3>
              <div className="space-y-4">
                <AddressInput placeholder="Nueva dirección del servidor" value={newServer} onChange={setNewServer} />
                <button className="btn btn-warning w-full" onClick={handleSetServer} disabled={!newServer}>
                  Cambiar Servidor
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-base-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">📝 Instrucciones</h3>
          <ul className="space-y-2">
            <li>
              • <strong>Cualquiera</strong> puede enviar fondos al contrato
            </li>
            <li>
              • Solo el <strong>Server</strong> puede designar un ganador
            </li>
            <li>
              • Solo el <strong>Ganador</strong> puede reclamar el premio
            </li>
            <li>
              • Solo el <strong>Owner</strong> puede cambiar el servidor
            </li>
            <li>• Una vez reclamado el premio, no se puede reclamar de nuevo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
