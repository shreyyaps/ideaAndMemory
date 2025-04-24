import Body from "./Components/Body";
import Header from "./Components/Header";
import VantaHalo from "./Components/VantaHalo";

function App() {
  return (
    <div className=" text-white flex flex-col h-screen box-border overflow-hidden relative">
      <VantaHalo className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 backdrop-blur-[40px]">

      <Header />
      <Body />
      </div>
    </div>
  );
}

export default App;
