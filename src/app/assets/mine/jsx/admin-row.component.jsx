// AdminRow takes in an event and returns the html formatted columns of an event
// (to be isnerted into a row)
//
// Props
// -----
// event:   An event object
// key:     The unique key for this entry (because we are using arrays in React)
// onEventDelete:   A function passed in by the caller that passes uuid of the
//                  event to be deleted back up to the caller.
class AdminRow extends React.Component {

    constructor(props) {
        super(props);
        this.eventDeleteHandler = this.eventDeleteHandler.bind(this);
    }

    eventDeleteHandler(e){
        this.props.onEventDelete(e.target.id);
    }

    render() {
        return (
            <div className="row event-box">
                <div className="col span-2-of-9 event-date">
                    <p>{this.props.event.date}</p>
                </div>
                <div className="col span-6-of-9 event-description event-name">
                    <p>{this.props.event.name}</p>
                </div>
                <div className="col span-1-of-9 event-delete-btn">
                    <button type="button" id={this.props.event.uuid} onClick={this.eventDeleteHandler}><i className="ion-trash-a" id={this.props.event.uuid}></i></button>
                </div>
            </div>
        );
    }
}
