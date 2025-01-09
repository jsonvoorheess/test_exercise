import styles from './App.module.css'
import {OptionsCard} from "./components/OptionsCard/OptionsCard.tsx";
import {Article} from "./components/Article/Article.tsx";
import {useEffect, useState,} from "react";
import {CheckboxName, CountStops, Ticket} from "./types.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store.ts";
import {resetTickets} from "./redux/TicketsSlice/TicketsSlice.ts";





export const App = () => {
    const [ticketsWithoutStops, setTicketsWithoutStops] = useState<Ticket[]>([])
    const tickets = useSelector((state: RootState) => state.tickets.value) as Ticket[]
    const options = useSelector((state: RootState) => state.tickets.options) as Record<CheckboxName, boolean>
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData= async () => {
            const response= await fetch("./src/data.json", {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.json()
        }

        fetchData().then((data:{ tickets: Ticket[] }) => {
            const sortedTickets = data.tickets.sort((a:Ticket,b:Ticket) => {
                return a.price - b.price
            })
            console.log(sortedTickets)
           dispatch(resetTickets(sortedTickets))
        })

    }, [])

    useEffect(() => {
        if (options.nothing) {
            const filteredArray = tickets.filter((ticket) => ticket.stops === 0)
            setTicketsWithoutStops(filteredArray)
        }
        if (!options.nothing) {
            if (options.one && options.two && options.three) {
                const filteredArray = tickets.filter((ticket) => ticket.stops > 0 && ticket.stops < 4)
                setTicketsWithoutStops(filteredArray)
            }
            if (options.one || options.two || options.three) {
                const stops = Object.entries(options).filter((opt) => {
                    if (opt[1]) {
                        return CountStops[opt[0] as "one" | "two" | "three"]
                    }
                })
                if (stops.length === 1) {
                    const filteredArray =  tickets.filter((ticket) => ticket.stops === CountStops[stops[0][0] as "one" | "two" | "three"])
                    setTicketsWithoutStops(filteredArray)
                } else {
                    const total = stops.reduce((total, currentValue) => {
                        total+=CountStops[currentValue[0] as "one" | "two" | "three"]
                        return total
                    }, 0)
                    if (total === 5) {
                        const filteredArray =  tickets.filter((ticket) => ticket.stops === 2 || ticket.stops === 3)
                        setTicketsWithoutStops(filteredArray)
                    }
                    if (total === 3) {
                        const filteredArray =  tickets.filter((ticket) => ticket.stops === 1 || ticket.stops === 2)
                        setTicketsWithoutStops(filteredArray)
                    }
                    if (total === 4) {
                        const filteredArray =  tickets.filter((ticket) => ticket.stops === 1 || ticket.stops === 3)
                        setTicketsWithoutStops(filteredArray)
                    }
                }

            }
        }
    }, [options])



      return (
            <main className={styles.main} >
              <OptionsCard />
              <section className={styles.articles} >
                  {options.nothing || (!options.nothing && (options.one || options.two || options.three)) ? ticketsWithoutStops.map((ticket) => {
                      return (
                          <Article
                              key={ticket.price * Math.random()}
                              price={ticket.price}
                              departure_date={ticket.departure_date}
                              departure_time={ticket.departure_time}
                              origin={ticket.origin}
                              origin_name={ticket.origin_name}
                              stops={ticket.stops}
                              arrival_time={ticket.arrival_time}
                              arrival_date={ticket.arrival_date}
                              destination={ticket.destination}
                              destination_name={ticket.destination_name}
                          />
                      )
                      })  :
                      tickets.map((ticket) => {
                      return (
                          <Article
                              key={ticket.price * Math.random()}
                              price={ticket.price}
                              departure_date={ticket.departure_date}
                              departure_time={ticket.departure_time}
                              origin={ticket.origin}
                              origin_name={ticket.origin_name}
                              stops={ticket.stops}
                              arrival_time={ticket.arrival_time}
                              arrival_date={ticket.arrival_date}
                              destination={ticket.destination}
                              destination_name={ticket.destination_name}
                          />
                      )
                  })}
              </section>
            </main>
  )
}

