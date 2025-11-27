import BlurLoader from "@/components/BlurLoader";
import { Instagram } from "lucide-react";

function Connect(props: any) {
  const { handleConnect, loading } = props;
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
                    bg-gray-50 dark:bg-neutral-900 px-4 text-center"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white">
        Connect Your Instagram
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
        Connect your Instagram account to enable auto comment reply, analytics,
        and engagement features.
      </p>

      {loading ? (
        <BlurLoader isLoading={true} color="white" name="HashLoader" />
      ) : (
        <button
          onClick={handleConnect}
          className="flex items-center gap-3 text-lg font-semibold px-6 py-3
                     bg-pink-600 hover:bg-pink-700 text-white rounded-lg 
                     transition duration-200 shadow-lg"
        >
          <Instagram />
          Connect with Instagram
        </button>
      )}
    </div>
  );
}

export default Connect;
