import React from "react";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_TallHero_Dash_zh_TW_2x._CB418727893_.jpg"
          alt="home__image"
        />

        <div className="home__row">
          <Product
            id="11111111"
            title="Sony 索尼 DualShock 4 無線控制器 適用於 PlayStation 4 遊戲機"
            price={2020}
            rating={5}
            image="https://m.media-amazon.com/images/I/41kaOFDXzSL._AC_SY200_.jpg"
          />
          <Product
            id="22222222"
            title="Darksiders Genesis - Nephilim Edition - PC Nephilim Edition"
            price={2020}
            rating={4}
            image="https://m.media-amazon.com/images/I/517J1Mfca0L._AC_SY200_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="4222222"
            title="AmazonBasics 硬殼旋轉器,隨身攜帶,可擴展行李箱,附輪子), N989"
            price={5499}
            rating={4}
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
          />
          <Product
            id="22222622"
            title="AmazonBasics 硬殼旋轉器,隨身攜帶,可擴展行李箱,附輪子), N989"
            price={599}
            rating={4}
            image="https://m.media-amazon.com/images/I/819WMWm6NoL._AC_SY400_.jpg"
          />
          <Product
            id="22232222"
            title="AmazonBasics 硬殼旋轉器,隨身攜帶,可擴展行李箱,附輪子), N989"
            price={5499}
            rating={4}
            image="https://m.media-amazon.com/images/I/716pgZxRYhL._AC_SY400_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            title="Darksiders Genesis - Nephilim Edition - PC Nephilim Edition"
            price={2020}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
