"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // Read contract data
  const { data: balance } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "getBalance",
  });

  const { data: winner } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "winner",
  });

  const { data: prizeClaimed } = useScaffoldReadContract({
    contractName: "ServerLottery",
    functionName: "prizeClaimed",
  });

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">🎰 Server Lottery DApp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          {/* Lottery Status */}
          <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-6 mt-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">🎲 Lottery Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>💰 Prize Pool:</span>
                <span className="font-bold">{balance ? `${Number(balance) / 1e18} MON` : "0 MON"}</span>
              </div>
              <div className="flex justify-between">
                <span>🏆 Current Winner:</span>
                <span>
                  {winner && winner !== "0x0000000000000000000000000000000000000000" ? (
                    <span className="text-green-500">Set</span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🎁 Prize Status:</span>
                <span className={prizeClaimed ? "text-red-500" : "text-green-500"}>
                  {prizeClaimed ? "Claimed" : "Available"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-lg mt-6">
            Una lotería descentralizada donde un servidor autorizado designa ganadores
          </p>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <div className="text-4xl mb-4">🎰</div>
              <p>
                Interactúa con la lotería usando la{" "}
                <Link href="/lottery" passHref className="link">
                  Lottery Interface
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
