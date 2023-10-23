import { useState, useCallback, useEffect, useRef } from "react";
import Save from "./Save.jsx";

function App() {
  const [len, setlen] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showSave, setShowSave] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("Save");

  // useref hook
  const passwordRef = useRef(null);

  const handleShowSave = () => {
    setShowSave((prev) => !prev);
    setButtonStatus((prev) => (prev === "Save" ? "Cancel" : "Save"));
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}|::";

    for (let index = 1; index < len; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [len, numAllowed, charAllowed, setPassword]);

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [len, numAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3 ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 "
          placeholder="Password"
          ref={passwordRef}
          readOnly
        />

        <button
          className="outline-none transition-transform transform active:scale-y-75 flex bg-blue-700 text-white dark:md:hover:bg-sky-300"
          onClick={copypasswordToClipboard}
        >
          <spam>Copy</spam>
        </button>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={len}
            className=" cursor-pointer "
            onChange={(e) => {
              setlen(e.target.value);
            }}
          />
          <label> Length:{len} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setnumAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultValue={charAllowed}
            id="charAllowed"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
        </div>
        <label> Character </label>
      </div>
      <div>
        <button
          className="outline-none transition-transform transform rounded-lg
          active:scale-y-75 flex bg-blue-700 text-white dark:md:hover:bg-sky-300"
          onClick={handleShowSave} >
          <spam>{buttonStatus}</spam>
        </button>

        {showSave && <Save />}
      </div>
    </div>
  );
}

export default App;
