import { MadeWithCrea } from "@/components/made-with-crea";
import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600 mb-8">
          Start building your amazing project here!
        </p>
        <Link to="/pitch-deck">
          <Button size="lg">View Pitch Deck</Button>
        </Link>
      </div>
      <MadeWithCrea />
    </div>
  );
};

export default Index;