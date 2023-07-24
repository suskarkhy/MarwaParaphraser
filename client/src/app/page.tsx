import Header from "./components/Header";
import Paraphrase from "./components/Paraphrase";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-700 p-10">
      <Header />
      <Paraphrase />
    </main>
  );
}
