import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorRequest, setErrorRequest] = useState('');
    const handleSumbit = async ()=> {
        setIsLoading(true);
        try{
            const req = await fetch('https://enhance-prompt-back.vercel.app/enhance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({prompt})
            })
            const res = await req.json();
            if (res) {
                setPrompt(res.enhancePrompt);
                setIsLoading(false);
                return;
            }
        setErrorRequest('Failed to enhance prompt');
        }catch(err){
            console.error(err);
        }

    }

    return (
        <>
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
                Welcome to Prompt Enhancer
            </h1>
            {errorRequest && <p className="text-red-500 text-lg mb-4">{errorRequest}</p>}
            <textarea 
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                cols="30" 
                rows="10"
                className="border border-white/30 rounded-lg p-4 mb-6 w-full max-w-lg resize-none bg-white bg-opacity-90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-md hover:shadow-lg"
                disabled={isLoading}

            />
            <button 
            onClick={handleSumbit}
            className="bg-yellow-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-200 transform hover:scale-105"
            disabled={isLoading} 
            >
                Enhance
            </button>
        </main>
        </>
    );
}