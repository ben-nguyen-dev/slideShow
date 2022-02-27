import React from "react";
import "./App.scss";
import { data, DataType } from "./data/data";
import HorizontalSlideShow from "./components/HorizontalSlideShow/HorizontalSlideShow";
import { SettingType } from "./components/HorizontalSlideShow/config";

function App() {
  const setting: SettingType = {
    slidesToShow: 7,
  };
  return (
    <div className="App">
      <HorizontalSlideShow setting={setting}>
        {data.map((item: DataType) => (
          <li key={item._id}>
            <img src={item.picture} alt="" />
            <div className="details">
              <span className="icon-bed">{item.description}</span>
            </div>
          </li>
        ))}
      </HorizontalSlideShow>
    </div>
  );
}

export default App;
