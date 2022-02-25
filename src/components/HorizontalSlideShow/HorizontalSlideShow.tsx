import React, {
  FC,
  ReactChild,
  ReactChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SettingType } from "./config";

interface Props {
  children: any;
  setting: SettingType;
}
const HorizontalSlideShow: FC<Props> = ({ setting, children }: Props) => {
  const childCenter = children[Math.floor(children.length / 2)];
  const [childrenState, setChildrenState] = useState<any>(children);
  const [childActive, setChildActive] = useState<any>(childCenter);
  const [left, setLeft] = useState(0);

  const ref = useRef<any>(null);
  const imageRefs = useRef<any>([]);

  useEffect(() => {
    const width =
      imageRefs.current[getIndexOfChild(childActive)].offsetWidth + 16;
    const newLeft =
      (getIndexOfChild(childActive) - getIndexOfChild(childCenter)) *
      width *
      -1;
    setLeft(newLeft);
  }, [childActive]);

  const defaultMargin = 16;
  const defaultWith = 180;

  const getIndexOfChild = (child: any) => {
    if (!child) return 0;

    const childrenKey = childrenState.map((child: any) => child.key);
    if (childrenKey.length > 0) {
      return childrenKey.indexOf(child.key);
    }
    return 0;
  };

  const childrenDefault = React.Children.map(childrenState, (child) => {
    let transform;
    let margin;
    if (child.key === childActive.key) {
      transform = `translateX(${left}px) scale(1.2)`;
      margin = `0 ${defaultMargin * 2.2}px`;
    } else if (
      getIndexOfChild(child) === getIndexOfChild(childActive) - 1 ||
      getIndexOfChild(child) === getIndexOfChild(childActive) + 1
    ) {
      transform = `translateX(${left}px) scale(1.1)`;
      margin = `0 ${defaultMargin * 2.1}px`;
    } else {
      transform = `translateX(${left}px)`;
      margin = `0 ${defaultMargin}px`;
    }

    return React.cloneElement(child, {
      onClick: () => setChildActive(child),
      style: {
        opacity: 1,
        transform: transform,
        margin: margin,
      },
      children: React.Children.map(child.props.children, (childOfChild) => {
        if (childOfChild.type === "img") {
          return React.cloneElement(childOfChild, {
            style: {
              width: defaultWith,
              height: defaultWith,
              border:
                child.key === childActive.key ? "5px blue solid" : undefined,
            },
            ref: (node: any) =>
              (imageRefs.current[getIndexOfChild(child)] = node),
          });
        }
      }),
    });
  });

  console.log({ childrenDefault });
  return (
    <div className="cards-slider">
      <ul className={"cards-slider-wrapper"} ref={ref}>
        {childrenDefault}
      </ul>
    </div>
  );
};
export default HorizontalSlideShow;
