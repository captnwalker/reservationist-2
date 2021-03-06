import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from "../actions/filters"
import TimePicker from 'rc-time-picker';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
    }

onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));

    }
onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
onSortChange = (e) => {
    if (e.target.value === 'date') {
        this.props.sortByDate();
    } else if (e.target.value === 'amount') {
        this.props.sortByAmount();
    }

};
render() {
    return (
            <div className="content-container">

            <div className="input-group">

                {/* Search Field */}
                <div className="input-group__item">

                    <input type="text" 
                        className="text-input"
                        placeholder="Search Reservations"
                        value={this.props.filters.text}
                        onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                        }}
                    />
            </div>
                {/* Sort Selector */}
                <div className="input-group__item">   
                <select
                        value={this.props.filters.sortBy}
                    onChange={(e) => {

                        if (e.target.value === 'date') {
                            this.props.dispatch(sortByDate());

                        } else if (e.target.value === 'amount') {
                            this.props.dispatch(sortByAmount());
                        }
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Time</option>
                </select>
                </div>

                {/* Date Picker */}
                <div className="input-group__item">
                    <DateRangePicker
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        //focused={this.state.calendarFocused}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        minimumNights={0}
                    />
                </div>               
            </div>              
        </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);