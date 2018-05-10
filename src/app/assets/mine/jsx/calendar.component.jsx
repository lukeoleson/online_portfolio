// calendar is in charge of rendering the actual calendar (either for admin or
// for users) as well as for handing up CRUD events.
//
// Props
// -----
// calendarName:    The name of the calendar
// mode:            A string stating either 'user' or 'admin' mode
// events:          An array of event objects
// onEventDelete:   A function passed in from the calling component that hands
//                  the uuid of the event to be deleted back up to the caller.
class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.deleteEventHandler = this.deleteEventHandler.bind(this);
    }

    deleteEventHandler(uuid) {
        this.props.onEventDelete(uuid);
    }

    render() {

        const noEvents = {name: "There are no events scheduled at this time", date: "-", uuid: "001", description: "..."};

        let eventRows = [];
        let calendarTitle = '';
        if (this.props.events.length == 0) {
            eventRows.push(<UserRow event={noEvents} />);
        } else {
            if (this.props.mode == 'user') {
                calendarTitle = this.props.calendarName;
                this.props.events.forEach( (event) => {
                    eventRows.push(<UserRow event={event} key={event.uuid} />);
                });
            } else {
                calendarTitle = 'Your Events';
                this.props.events.forEach( (event) => {
                    eventRows.push(<AdminRow event={event} key={event.uuid} onEventDelete={this.deleteEventHandler}/>);
                });
            }
        }

        return (
            <div className="row">
                <h3>{calendarTitle}</h3>
                {eventRows}
            </div>
        );
    }
}
