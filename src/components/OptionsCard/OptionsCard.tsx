import styles from "./OptionsCard.module.css"
import classNames from "classnames";
import * as React from "react";
import {CurrencyState} from "../../types.ts";
import {CheckboxName} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {changeCurrency} from "../../redux/CurrencySlice/CurrencySlice.ts";
import {changeOptions, resetOptions} from "../../redux/TicketsSlice/TicketsSlice.ts";
import {useState} from "react";


export const OptionsCard = () => {
    const options = useSelector((state: RootState) => state.tickets.options) as Record<CheckboxName, boolean>
    const [onlyOption, setOnlyOption] = useState(options.nothing)
    const [resetChecks, setResetChecks] = useState(false)
    const currency = useSelector((state: RootState) => state.currency.value)

    const dispatch = useDispatch()

    const onButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const targ = e.target as HTMLButtonElement
        dispatch(changeCurrency(targ.innerHTML as CurrencyState))

    }

    const onCheckBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const targ = e.target as HTMLInputElement
        const statusCheckbox = targ.checked
        const nameCheckbox = targ.name as CheckboxName
        dispatch(changeOptions([nameCheckbox, statusCheckbox]))
        if (nameCheckbox === "nothing") {
            if (options.nothing) {
                setOnlyOption(false)
            } else {
                setOnlyOption(true)
            }
        }
        if (nameCheckbox === "all" && statusCheckbox) {
            dispatch(resetOptions(["nothing", "all", "one", "two", "three"]))
            setResetChecks(true)
        }
        if (nameCheckbox === "all" && !statusCheckbox) {
            setResetChecks(false)
        }
    }


    return (
        <aside className={styles.card} >
            <div className={styles.title_card} >
                <p className={styles.top_level_p} >Валюта</p>
                <div className={styles.btns} onClick={event => onButtonClick(event)} >
                    <button className={classNames(styles.btn1, styles.btn, {
                        [styles.backgr]: currency === "RUB"
                    })}  >
                        RUB
                    </button>
                    <button className={classNames(styles.btn, {
                        [styles.backgr]: currency === "USD"
                    })} >
                        USD
                    </button>
                    <button className={classNames(styles.btn3, styles.btn, {
                        [styles.backgr]: currency === "EUR"
                    })}  >
                        EUR
                    </button>
                </div>
            </div>
            <div>
                <p className={styles.title_card} >Количество пересадок</p>
                <div className={styles.checkboxes} onClick={(e) => onCheckBoxClick(e)} >
                    <label className={styles.label} >
                        <input name="all" type="checkbox"/>
                        Все
                    </label>
                        <label className={classNames(styles.label,
                            {
                                [styles["labelNothing"]]:onlyOption
                            }
                        )}>
                            <input name="nothing" type="checkbox" disabled={resetChecks} checked={resetChecks ? false : undefined} />
                            Без пересадок
                        </label>
                    <label className={styles.label}>
                        <input name="one" type="checkbox" disabled={resetChecks} checked={resetChecks ? false : undefined} />
                        1 пересадка
                    </label>
                    <label className={styles.label} >
                        <input name="two" type="checkbox" disabled={resetChecks} checked={resetChecks ? false : undefined} />
                        2 пересадки
                    </label>
                    <label className={styles.label} >
                        <input name="three" type="checkbox" disabled={resetChecks} checked={resetChecks ? false : undefined} />
                        3 пересадки
                    </label>

                </div>
            </div>
        </aside>
    );
};
