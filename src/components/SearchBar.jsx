
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client.js";

export default function SearchBar() {
    const router = useRouter();
    const [username, setUserName] = useState("");

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            if (!username) {
                alert("Please enter a valid user name.");
                return;
            }
            router.push(`/repoCountsResult?username=${encodeURIComponent(username)}`);
            const repoCounts = await client.getRepoCounts(username);
            console.log('repo counts', repoCounts)
        } catch (error) {
            console.error("Error fetching user repositories:", error);
            setError(error);
        }
    }

    return (
        <div className="container mx-auto mt-8 mb-20">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                    type="text"
                    id="username-input"
                    placeholder="User Name"
                    className="text-xl min-h-[50px] p-2.5 rounded border border-solid border-stone-300 flex-1 rounded-lg"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-red-700 text-white rounded text-xl min-h-[50px] px-6 py-4 flex-shrink-0 md:px-6"
                >
                    Search
                </button>
            </form>
        </div>
      );
}