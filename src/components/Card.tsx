import React, { FC } from "react";
import { DataType } from "../data/data";

interface Props {
  children?: any;
  property: DataType;
  currentProperty: DataType;
  selectProperty: Function;
  style?: any;
}
const Card: FC<Props> = ({
  property,
  selectProperty,
  currentProperty,
  style,
}: Props) => {
  const { picture, index, description } = property;
  const isSelected = property._id === currentProperty._id;

  return (
    <div
      id={`card-${index}`}
      className={`card`}
      onClick={() => selectProperty(property)}
      style={style}
    >
      <img
        src={picture}
        alt=""
        className={`${isSelected ? "active" : ""}`}
        style={style}
      />
      {isSelected ?? (
        <div className="details">
          <span className="index">{index + 1}</span>
          <ul className="features">
            <li className="icon-bed">{description}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Card;
