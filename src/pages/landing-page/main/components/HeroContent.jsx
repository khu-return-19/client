import KHU from "assets/icons/KHU.svg";

function HeroContent() {
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: "536px", paddingTop: "135px", paddingBottom: "148px" }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: "180px", height: "45px" }}
      >
        <img src={KHU} alt="KHU" style={{ width: "60px", height: "35px" }} />
        <span
          style={{
            fontSize: "30px",
            fontWeight: 200,
            lineHeight: "150%",
            color: "white",
          }}
        >
          &nbsp;×&nbsp;
        </span>
        <span
          style={{
            fontSize: "24px",
            fontWeight: 300,
            lineHeight: "150%",
            color: "white",
          }}
        >
          Pertineo
        </span>
      </div>
    </div>
  );
}

export default HeroContent;
