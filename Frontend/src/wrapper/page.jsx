import { Navbar } from "../components/Navbar";

export default function Wrapper({ children }) {
  return (
    <div className="flex flex-col relative gap-4">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-100">
        <Navbar />
      </div>
      <div className="flex mt-2">{children}</div>
    </div>
  );
}
