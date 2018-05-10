// UserRow takes in a single event and returns the columns making a single html
// event (to be inserted into a row
//
// Props
// -----
// event:   An event object
// key:     The unique key for this entry (because we are using arrays in React)
class UserRow extends React.Component {
    render() {
        return (
            <div className="row event-box">
                <div className="col span-2-of-9 event-date">
                    <p>{this.props.event.date}</p>
                </div>
                <div className="col span-6-of-9 event-description">
                    <p>{this.props.event.name}</p>
                </div>
                <div className="col span-1-of-9 event-blank">
                    <p>&nbsp;</p>
                </div>
            </div>
        );
    }
}
