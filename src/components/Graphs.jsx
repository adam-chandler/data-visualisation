import React from "react";
import axios from "axios";
import Barchart from "./Barchart";
import HeatMap from "./HeatMap";

class Graphs extends React.Component {
  state = {
    data18: [],
    data19: [],
    data20: [],
    isLoading: true,
    hide2018: false,
    hide2019: false,
    hide2020: false,
    month: "01",
  };

  currDate = new Date();
  currMonth =
    this.currDate.getMonth() >= 10
      ? `${this.currDate.getMonth() + 1}`
      : `0${this.currDate.getMonth() + 1}`;

  render() {
    const {
      isLoading,
      data18,
      data19,
      data20,
      hide2018,
      hide2019,
      hide2020,
      month,
    } = this.state;

    console.log(data20);

    if (isLoading) return <h2>Loading...</h2>;
    return (
      <main>
        <form onChange={this.handleChange}>
          2018: <input type="checkbox" value="2018" defaultChecked />
          2019: <input type="checkbox" value="2019" defaultChecked />
          2020: <input type="checkbox" value="2020" defaultChecked />
        </form>

        <select
          name="month"
          id="month"
          value={month}
          onChange={this.handleMonthChange}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <Barchart
          className="barchart"
          data18={hide2018 ? [] : data18}
          data19={hide2019 ? [] : data19}
          data20={hide2020 ? [] : data20}
        />
        <HeatMap
          data18={hide2018 ? [] : data18}
          data19={hide2019 ? [] : data19}
          data20={hide2020 ? [] : data20}
        />
      </main>
    );
  }

  handleMonthChange = (event) => {
    const newMonth = event.target.value;
    this.setState({ month: newMonth, isLoading: true });
  };

  handleChange = (event) => {
    const year = event.target.value;
    if (year === "2018")
      this.setState((cur) => {
        return { hide2018: !cur.hide2018 };
      });
    if (year === "2019")
      this.setState((cur) => {
        return { hide2019: !cur.hide2019 };
      });
    if (year === "2020")
      this.setState((cur) => {
        return { hide2020: !cur.hide2020 };
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month) {
      this.getData(this.state.month, this.state.month);
    }
  }

  componentDidMount() {
    this.getData("01", "01");
  }

  getData = (month, month2020) =>
    axios
      .all([
        axios.get(
          `https://data.police.uk/api/stops-street?lat=53.472092&lng=-2.238665&date=2018-${month}`
        ),
        axios.get(
          `https://data.police.uk/api/stops-street?lat=53.472092&lng=-2.238665&date=2019-${month}`
        ),
        month2020 >= `${this.currMonth}`
          ? { data: [] }
          : axios.get(
              `https://data.police.uk/api/stops-street?lat=53.472092&lng=-2.238665&date=2020-${month2020}`
            ),
      ])
      .then(
        axios.spread((data18, data19, data20) => {
          const chosenData18 = data18.data.map((crime) => {
            return {
              age: crime.age_range,
              gender: crime.gender,
              lat: crime.location.latitude,
              lon: crime.location.longitude,
              searchFor: crime.object_of_search,
              year: "2018",
            };
          });
          const chosenData19 = data19.data.map((crime) => {
            return {
              age: crime.age_range,
              gender: crime.gender,
              lat: crime.location.latitude,
              lon: crime.location.longitude,
              searchFor: crime.object_of_search,
              year: "2019",
            };
          });
          const chosenData20 = data20.data.map((crime) => {
            return {
              age: crime.age_range,
              gender: crime.gender,
              lat: crime.location.latitude,
              lon: crime.location.longitude,
              searchFor: crime.object_of_search,
              year: "2020",
            };
          });

          this.setState({
            data18: chosenData18,
            data19: chosenData19,
            data20: chosenData20,
            isLoading: false,
          });
        })
      );
}

export default Graphs;
