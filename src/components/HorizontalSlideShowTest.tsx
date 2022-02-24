import React, { CSSProperties, FC, useMemo, useState } from "react";

import { DataType } from "../data/data";
import Card from "./Card";

interface Props {
  properties: DataType[];
}

const HorizontalSlideShowTest: FC<Props> = ({ properties }: Props) => {
  const [currentProperty, setCurrentProperty] = useState<DataType>(
    properties[0]
  );
  const numberOfItemShow = 5;

  const customStyle: CSSProperties = {
    width: 200,
    height: 200,
  };

  const nextProperty = () => {
    const newIndex = currentProperty.index + 1;
    setCurrentProperty(properties[newIndex]);
  };

  const prevProperty = () => {
    const newIndex =
      currentProperty.index - 1 > 0 ? currentProperty.index - 1 : 0;
    setCurrentProperty(properties[newIndex]);
  };

  const selectProperty = (propertySelected: DataType) => {
    console.log({ propertySelected });
    if (!propertySelected) return;
    setCurrentProperty(propertySelected);
  };

  return (
    <div className="horizontal-slideshow">
      <button
        onClick={() => nextProperty()}
        disabled={currentProperty.index === properties.length - 1}
      >
        Next
      </button>
      <button
        onClick={() => prevProperty()}
        disabled={currentProperty.index === 0}
      >
        Prev
      </button>

      <div className="page">
        <section>
          <h1>Image slideshow React tutorial.</h1>
        </section>

        <div className="col">
          <div className={`cards-slider active-slide-${currentProperty.index}`}>
            <div
              className="cards-slider-wrapper"
              style={{
                transform: `translateX(-${
                  currentProperty.index * (100 / properties.length)
                }%)`,
              }}
            >
              {properties.map((property) => (
                <Card
                  key={property._id}
                  property={property}
                  selectProperty={selectProperty}
                  currentProperty={currentProperty}
                  style={customStyle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HorizontalSlideShowTest;
