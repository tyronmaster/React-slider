import { useRef, useState } from "react";
import "./App.css";

function App() {
  enum MaskTypes {
    LeafLeft = "leaf-left",
    LeafRight = "leaf-right",
    Wide = "wide",
    Circle = "circle",
    Rounded = "rounded",
  }
  const [slides] = useState([
    {
      id: 1,
      mask: MaskTypes.LeafLeft,
      src: "src/assets/images/goat.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 2,
      mask: MaskTypes.LeafRight,
      src: "src/assets/images/harvester.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 3,
      mask: MaskTypes.Wide,
      src: "src/assets/images/cow-laying.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 4,
      mask: MaskTypes.Circle,
      src: "src/assets/images/cow-standing.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },

    {
      id: 5,
      mask: MaskTypes.Rounded,
      src: "src/assets/images/pigs.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
  ]);
  const [trackStart, setTrackStart] = useState(0);
  const [buttonsState, setButtonsState] = useState({
    right: true,
    left: false,
  });
  const sliderTrack = useRef(null);
  const speed = 150;

  function pressRight() {
    const trackWidth = sliderTrack.current.offsetWidth;
    const windowWidth = window.innerWidth;

    if (trackStart + trackWidth - speed > windowWidth) {
      if (!buttonsState.left)
        setButtonsState({ ...buttonsState, left: true });

      const start = trackStart - speed;
      sliderTrack.current.style.left = start + "px";
      setTrackStart(start);
    } else {
      const start = -(trackWidth - windowWidth);
      sliderTrack.current.style.left = start + "px";
      setTrackStart(start);
      setButtonsState({ ...buttonsState, right: false });
    }
  }

  function pressLeft() {
    if (trackStart < 0) {
      if (!buttonsState.right) setButtonsState({ ...buttonsState, right: true });
      const start = trackStart + speed;
      sliderTrack.current.style.left = start + "px";
      setTrackStart(start);
    } else {
      setButtonsState({ ...buttonsState, left: false });
    }
  }

  return (
    <div className="slider">
      <div className="slider__header container">
        <h1 className="slider__title">Полезные материалы</h1>
        <div className="slider__description">
          Собрали для вас полезные исследования схемы кормления и другие
          материалы, которые пригодятся для лучших результатов на вашем
          хозяйстве
        </div>
      </div>

      <div className="slider__wrapper">
        <div className="slider__track">
          <div className="slider__items" ref={sliderTrack}>
            {slides.map((slide) => (
              <div className="slider__item" key={slide.id}>
                <div className={"item__picture" + " " + slide.mask}>
                  <img
                    src={slide.src}
                    alt="item image"
                    className="item__image"
                  />
                </div>
                <div className="item__text">
                  <a href="#" className="item__link">
                    {slide.title}
                  </a>
                  <p className="item__date">{slide.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider__controls container">
          <div
            className={
              buttonsState.left
                ? "slider__control left"
                : "slider__control left disabled"
            }
            onClick={pressLeft}
          >
            <svg
              width="173"
              height="23"
              viewBox="0 0 173 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="10" width="172" height="2.99998" fill="#7884A5" />
              <path
                d="M12 0V0C12 6.07513 7.07513 11 0.999998 11L-9.69627e-07 11"
                stroke="#7884A5"
                strokeWidth="3"
              />
              <path
                d="M12 23V23C12 16.9249 7.07513 12 1 12L6.11999e-07 12"
                stroke="#7884A5"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div
            className={
              buttonsState.right
                ? "slider__control right"
                : "slider__control right disabled"
            }
            onClick={pressRight}
          >
            <svg
              width="173"
              height="23"
              viewBox="0 0 173 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="172"
                height="2.99998"
                transform="matrix(-1 8.74228e-08 8.74228e-08 1 172 10)"
                fill="#7884A5"
              />
              <path
                d="M161 0V0C161 6.07513 165.925 11 172 11L173 11"
                stroke="#7884A5"
                strokeWidth="3"
              />
              <path
                d="M161 23V23C161 16.9249 165.925 12 172 12L173 12"
                stroke="#7884A5"
                strokeWidth="3"
              />
            </svg>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
