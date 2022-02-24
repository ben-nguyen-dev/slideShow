import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { SettingType } from "./config";

interface Props {
  children: any;
  setting: SettingType;
}
const HorizontalSlideShow: FC<Props> = ({ setting, children }: Props) => {
  const [childActive, setChildActive] = useState(children[0]);
  const ref = useRef(null);
  useEffect(() => {
    console.log("width", ref.current);
  }, [ref.current]);

  // console.log({ widthElementParent });
  const defaultWith = useMemo(() => {
    const widthElementParent = window.innerWidth;
    return widthElementParent / (setting.slidesToShow * 2 + 1);
  }, [window]);

  console.log({ defaultWith });

  const getIndexOfChild = (child: any) => {
    if (!child) return 0;

    const childrenKey = children.map((child: any) => child.key);
    if (childrenKey.length > 0) {
      return childrenKey.indexOf(child.key);
    }
    return 0;
  };

  const childrenDefault = React.Children.map(children, (child) => {
    // item active
    if (child.key === childActive.key) {
      return React.cloneElement(child, {
        onClick: () => setChildActive(child),
        style: {
          opacity: 1,
        },
        children: React.Children.map(child.props.children, (childOfChild) => {
          if (childOfChild.type === "img") {
            return React.cloneElement(childOfChild, {
              style: {
                width: defaultWith * 1.5,
                height: defaultWith * 1.5,
                border: "5px blue solid",
              },
            });
          }
        }),
      });
    }
    // item nearest item active
    else if (
      getIndexOfChild(child) === getIndexOfChild(childActive) - 1 ||
      getIndexOfChild(child) === getIndexOfChild(childActive) + 1
    ) {
      return React.cloneElement(child, {
        onClick: () => setChildActive(child),
        children: React.Children.map(child.props.children, (childOfChild) => {
          if (childOfChild.type === "img") {
            return React.cloneElement(childOfChild, {
              style: {
                width: defaultWith * 1.25,
                height: defaultWith * 1.25,
              },
            });
          }
        }),
      });
    } else {
      return React.cloneElement(child, {
        onClick: () => setChildActive(child),
        children: React.Children.map(child.props.children, (childOfChild) => {
          if (childOfChild.type === "img") {
            return React.cloneElement(childOfChild, {
              style: {
                width: defaultWith,
                height: defaultWith,
              },
            });
          }
        }),
      });
    }
  });

  const translateNumber = useMemo(() => {
    console.log({
      a: (getIndexOfChild(childActive) - 2) * (100 / (children.length + 1)),
    });
  }, [childActive]);

  return (
    <div className="cards-slider" ref={ref} id="slider">
      <ul
        className={"cards-slider-wrapper"}
        style={{
          transform: `translateX(${
            -(getIndexOfChild(childActive) - 2) * (100 / (children.length + 1))
          }%)`,
        }}
      >
        {childrenDefault}
      </ul>
    </div>
  );
};
export default HorizontalSlideShow;
