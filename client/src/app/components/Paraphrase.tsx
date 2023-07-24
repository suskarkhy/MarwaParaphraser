"use client";
import { useState } from "react";
import { AiOutlineCopy, AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";

const Paraphrase = () => {
  const [question, setQuestion] = useState("");
  const [paraphrasedResult, setParaphrasedResult] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleParaphrase = async () => {
    setLoading(true); // Set loading state to true before making the API call

    try {
      const response = await fetch("/api/paraphrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();
      setParaphrasedResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false); // Set loading state to false after API call is complete
    setCopiedIndex(-1);
  };

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex w-full justify-between items-center gap-10">
        <input
          type="text"
          className="w-full outline-none placeholder-pink-400 bg-gray-800 text-white p-4 rounded-lg mb-4"
          placeholder="Write Here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="h-24 w-36 outline-none font-light bg-gray-600 text-pink-400 rounded-full hover:bg-pink-400 transition-all duration-300 ease-in-out hover:text-black"
          onClick={handleParaphrase}
        >
          Paraphrase
        </button>
      </div>

      {loading ? (
        <span className="flex justify-center text-pink-400">
          <AiOutlineLoading className="animate-spin text-4xl" />
        </span> // Show a loading indicator while the API call is in progress
      ) : (
        paraphrasedResult && (
          <div className="flex flex-col items-center gap-5 text-white">
            {paraphrasedResult.map((result, index) => (
              <div
                onClick={() => copyText(result, index)}
                className="flex justify-between w-4/5 p-10 bg-gray-600"
                key={index}
              >
                <p className="cursor-pointer">{result}</p>
                <button>
                  {copiedIndex === index ? (
                    <AiOutlineCheck className="text-2xl text-pink-400" />
                  ) : (
                    <AiOutlineCopy className="text-2xl text-pink-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
};

export default Paraphrase;
