"use client";
import { useState } from "react";
import { AiOutlineCopy, AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
import Toaster from "./Toaster";

const Paraphrase = () => {
  interface ParaphrasedResult {
    id: string;
    suggestions: { text: string }[];
  }

  const [question, setQuestion] = useState("");
  const [paraphrasedResult, setParaphrasedResult] = useState<ParaphrasedResult>({
    id: "",
    suggestions: [],
  });
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  const showToast = () => {
    setShowToaster(true);
  };

  const closeToaster = () => {
    setShowToaster(false);
  };

  const handleParaphrase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading when the form is submitted
    if (question === "") {
      showToast();
      return;
    }
    setLoading(true); // Set loading state to true before making the API call

    try {
      const response = await fetch("https://api.ai21.com/studio/v1/paraphrase", {
        method: "POST",
        headers: {
          Authorization: "Bearer 9NAPacYgIgU1d6vkAbERX1OQx7WTyp2k",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });

      const data = await response.json();
      setParaphrasedResult(data);
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

  const clearInput = () => {
    // Clear the input field
    const input = document.querySelector("input");
    if (input) {
      input.value = "";
      setQuestion("");
    }
  };

  return (
    <section className="flex flex-col gap-10">
      <form onSubmit={handleParaphrase}>
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
            type="submit"
          >
            Paraphrase
          </button>

          <button
            className="h-24 w-36 outline-none font-light bg-gray-600 text-pink-400 rounded-full hover:bg-pink-400 transition-all duration-300 ease-in-out hover:text-black"
            onClick={() => clearInput()}
            type="button"
          >
            Clear
          </button>
        </div>
      </form>
      {showToaster && (
        <Toaster
          message="write something dumb bitch"
          duration={5000} // Duration in milliseconds (5 seconds in this example)
          onClose={closeToaster}
        />
      )}
      {loading ? (
        <span className="flex justify-center text-pink-400">
          <AiOutlineLoading className="animate-spin text-4xl" />
        </span> // Show a loading indicator while the API call is in progress
      ) : (
        paraphrasedResult && (
          <div className="flex flex-col items-center gap-5 text-white">
            {paraphrasedResult.suggestions.map((result, index) => (
              <div
                onClick={() => copyText(result.text, index)}
                className="flex justify-between w-4/5 p-10 bg-gray-600"
                key={index}
              >
                <p className="cursor-pointer">{result.text}</p>
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
