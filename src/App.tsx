import { useRef, useState, useEffect } from "react";
import "./App.css";

enum MaskTypes {
  LeafLeft = "leaf-left",
  LeafRight = "leaf-right",
  Wide = "wide",
  Circle = "circle",
  Rounded = "rounded",
}

function App() {
  const [slides] = useState([
    {
      id: 1,
      mask: MaskTypes.LeafLeft,
      src: "https://celes.club/uploads/posts/2021-12/1640090749_5-celes-club-p-zhivotnie-v-derevne-zhivotnie-krasivo-foto-6.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 2,
      mask: MaskTypes.LeafRight,
      src: "https://celes.club/uploads/posts/2021-12/1640090810_4-celes-club-p-zhivotnie-v-derevne-zhivotnie-krasivo-foto-4.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 3,
      mask: MaskTypes.Wide,
      src: "https://celes.club/uploads/posts/2021-12/1640090779_2-celes-club-p-zhivotnie-v-derevne-zhivotnie-krasivo-foto-2.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
    {
      id: 4,
      mask: MaskTypes.Circle,
      src: "https://celes.club/uploads/posts/2021-12/1640090778_3-celes-club-p-zhivotnie-v-derevne-zhivotnie-krasivo-foto-3.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },

    {
      id: 5,
      mask: MaskTypes.Rounded,
      src: "https://celes.club/uploads/posts/2021-12/1640090732_1-celes-club-p-zhivotnie-v-derevne-zhivotnie-krasivo-foto-1.jpg",
      title:
        "Как повысить удои коров: факторы, от которых зависит молочная продуктивность",
      date: "22 ноября 2023      ",
    },
  ]);
  const [buttonsState, setButtonsState] = useState({
    right: true,
    left: false,
  });
  const [slider, setSlider] = useState({
    start: 0,
    width: 0,
    posX: 0,
    moveX: 0,
    step: 0,
    mouseDown: false,
  });
  const sliderTrack = useRef<HTMLDivElement>(null);
  const butonsSpeed = 150;
  const padding = 40;

  function pressRight() {
    const windowWidth = window.innerWidth;
    const sliderWidth = sliderTrack.current!.offsetWidth;
    const widthChecker = slider.start + sliderWidth - butonsSpeed > windowWidth;

    if (widthChecker) {
      if (!buttonsState.left) {
        setButtonsState({ ...buttonsState, left: true });
      }
      const start = slider.start - butonsSpeed;
      setSlider({ ...slider, start });
      sliderTrack.current!.style.transform = `translateX(${start}px)`;
    } else {
      const start = -(sliderWidth - windowWidth + padding);
      setSlider({ ...slider, start });
      sliderTrack.current!.style.transform = `translateX(${start}px)`;
      setButtonsState({ ...buttonsState, right: false });
    }
  }
  function pressLeft() {
    if (slider.start + butonsSpeed < padding) {
      if (!buttonsState.right)
        setButtonsState({ ...buttonsState, right: true });
      const start = slider.start + butonsSpeed;
      sliderTrack.current!.style.transform = `translateX(${start}px)`;
      setSlider({ ...slider, start });
    } else {
      setSlider({ ...slider, start: padding });
      sliderTrack.current!.style.transform = `translateX(${padding}px)`;
      setButtonsState({ ...buttonsState, left: false });
    }
  }

  const swipeStart = (e: React.TouchEvent): void => {
    setSlider({ ...slider, posX: e.targetTouches[0].clientX });
  };
  const swipeAction = (e: React.TouchEvent): void => {
    const moveX = e.targetTouches[0].clientX;
    const step = slider.posX - moveX;
    const start = slider.start - step;

    setSlider({
      ...slider,
      moveX,
      step,
    });
    sliderTrack.current!.style.transform = `translateX(${start}px)`;
  };
  const swipeEnd = () => {
    const windowWidth = window.innerWidth;
    const sliderWidth = sliderTrack.current!.offsetWidth;
    let start = slider.start;
    if (start - slider.step > padding) {
      start = 0;
      setButtonsState({ right: true, left: false });
    } else if (start + sliderWidth - slider.step < windowWidth) {
      start = -(sliderWidth - windowWidth + padding);
      setButtonsState({ left: true, right: false });
    } else {
      start = start - slider.step;
      setButtonsState({ left: true, right: true });
    }

    setSlider({ ...slider, start });
    sliderTrack.current!.style.transform = `translateX(${start}px)`;
  };

  const onMouseDown = (e: React.MouseEvent): void => {
    setSlider({ ...slider, posX: e.clientX, mouseDown: true });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (slider.mouseDown) {
      const moveX = e.clientX;
      const step = slider.posX - moveX;
      const start = slider.start - step;

      setSlider({
        ...slider,
        moveX,
        step,
      });
      sliderTrack.current!.style.transform = `translateX(${start}px)`;
    }
  };
  const onMouseUp = () => {
    const windowWidth = window.innerWidth;
    const sliderWidth = sliderTrack.current!.offsetWidth;
    let start = slider.start;

    if (start - slider.step > padding) {
      start = 0;
      setButtonsState({ right: true, left: false });
    } else if (start + sliderWidth - slider.step < windowWidth) {
      start = -(sliderWidth - windowWidth + padding);
      setButtonsState({ left: true, right: false });
    } else {
      start = start - slider.step;
      setButtonsState({ left: true, right: true });
    }

    setSlider({ ...slider, start, mouseDown: false });
    sliderTrack.current!.style.transform = `translateX(${start}px)`;
  };

  useEffect(() => {
    if (sliderTrack.current) {
      setSlider({
        ...slider,
        width: sliderTrack.current.offsetWidth,
      });
    }
  }, []);

  useEffect(() => {
    setSlider({ ...slider, moveX: slider.posX });
  }, [slider.posX]);

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
        <div
          className="slider__track"
          onTouchStart={(e) => swipeStart(e)}
          onTouchMove={(e) => swipeAction(e)}
          onTouchEnd={swipeEnd}
          onMouseDown={(e) => onMouseDown(e)}
          onMouseMove={(e) => onMouseMove(e)}
          onMouseUp={onMouseUp}
        >
          <div className="slider__items" ref={sliderTrack}>
            {slides.map((slide) => {
              // const imgUrl = new URL(slide.src, import.meta.url).href
              return (
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
              );
            })}
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
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
