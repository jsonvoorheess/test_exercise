import styles from "./Article.module.css"
import Plane from "../../assets/plane.svg?react"
import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {getCorrectDeclension, TranslateDate} from "../../utils.ts";


interface ArticleProps {
    price: number,
    departure_date: string,
    departure_time: string,
    origin: string,
    origin_name: string,
    stops: number,
    arrival_time:string,
    arrival_date: string,
    destination: string,
    destination_name: string
}

export const Article:FC<ArticleProps> = ({ price, departure_date, departure_time, origin, origin_name, stops, arrival_date, arrival_time, destination, destination_name }) => {

    const currency = useSelector((state: RootState) => state.currency.value)

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const euro = Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    const rubles = Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });


    const convertPrice = (price: number) => {
        if (currency === "RUB") return price
        if (currency === "EUR") return price * 0.0096
        if (currency === "USD") return price * 0.01
    }


    const convertedPrice = currency === "EUR" ? euro.format(convertPrice(price) as number) : currency === "RUB" ? rubles.format(price) : USDollar.format(convertPrice(price) as number)

    return (
        <article className={styles.article} >
            <div className={styles.leftSide} >
                    <img className={styles.img}
                         src="https://logowik.com/content/uploads/images/thy-turkish-airlines-new6886.jpg"
                         alt="логотип компании"/>
                <button className={styles.btn}>
                    <span>Купить</span>
                    <span>
                        за {
                        convertedPrice
                    }
                    </span>
                </button>
            </div>
            <div className={styles.blocksLine} ></div>
            <div className={styles.blockInfo} >
                <div>
                    <p className={styles.timeInfo} >{departure_time}</p>
                    <p>{origin},{origin_name}</p>
                    <span className={styles.date} >{TranslateDate(departure_date)}</span>
                </div>
                <div className={styles.planesInfo} >
                    <p className={styles.countStops} >{stops} {getCorrectDeclension(stops, ["пересадка", "пересадки", "пересадок"])}</p>
                    <div className={styles.planeIcon} >
                        <div className={styles.line}></div>
                        <Plane/>
                    </div>
                </div>
                <div>
                <p className={styles.timeInfo} >{arrival_time}</p>
                    <p>{destination}, {destination_name}</p>
                    <span className={styles.date} >{TranslateDate(arrival_date)}</span>
                </div>
            </div>
        </article>
    );
};

