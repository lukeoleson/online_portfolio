// CreateEventForm renders the admin form that allows users to create new events
// as well as passes up the data from the form to the calling component.
//
// Props
// -----
// onEventCreate:   A function passed in by the caller that hands the values
//                  passed by the user through the create event form up to the
//                  calling component.
class CreateEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.eventCreationHandler = this.eventCreationHandler.bind(this);
    }

    eventCreationHandler(e) {

        const name = document.querySelector('div.create-event-form input[name="event-name"]');
        const date = document.querySelector('div.create-event-form input[name="event-date"]');
        const desc = document.querySelector('div.create-event-form textarea[name="event-description"]');

        if (name.reportValidity() && date.reportValidity() && desc.reportValidity()) {
            const eventObj = {
                name: name.value,
                date: date.value,
                description: desc.value,
                uuid: EVENT_UUID++
            };
            this.props.onEventCreation(eventObj);
            name.value = '';
            date.value = '';
            desc.value = '';
        }
    }

    render() {
        return (
            <div className="row">
                <div className="create-event-form">
                    <h3>Create New Event</h3>

                    <div className="row">
                        <div className="col span-1-of-3 form-label">
                            <label for="event-name">Event Name: </label>
                        </div>
                        <div className="col span-2-of-3 form-field">
                            <input type="text" name="event-name" placeholder="your event name" required/>
                        </div>
                    </div>

                    <div className="row" id="form-fields">
                        <div className="col span-1-of-3 form-label">
                            <label for="event-date">Date: </label>
                        </div>
                        <div className="col span-2-of-3 form-field">
                            <input type="Date" name="event-date" required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col span-1-of-3 form-label">
                            <label for="event-description">Description: </label>
                        </div>
                        <div className="col span-2-of-3 form-field">
                            <textarea name="event-description" placeholder="describe your event here. Don't forget to include things like start and finish times, cost of entry, etc." maxLength="400"  required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col span-1-of-3 form-label">
                            <label for="create-btn">&nbsp;</label>
                        </div>
                        <div className="col span-2-of-3 form-field">
                            <div className="btn-container">
                                <button type="button" className="create-btn ghost-btn" onClick={this.eventCreationHandler}>Add Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
