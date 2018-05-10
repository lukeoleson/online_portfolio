// SettingsPanel renders and controls the "Calendar Settings" panel of the admin
// view window.
//
// Props
// -----
// calendarName:            The name of the calendar.
// mode:                    Admin or user.
// onNameChange:            A function passed in by the caller that takes in
//                          the new calendar name as entered by the user.
//
// State
// -----
// isEditing:               A boolean that tells us whether or not the user has
//                          clicked the "edit" button and is changing the
//                          calendar name
class SettingsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.isEditingHandler = this.isEditingHandler.bind(this);
        this.cancelNameChangeHandler = this.cancelNameChangeHandler.bind(this);
        this.state = {
            isEditing: false
        }
    }

    isEditingHandler(e) {
        this.setState({
            isEditing: true
        });
    }

    nameChangeHandler(e) {

        console.log("in name change handler");
        const textBox = document.querySelector('div.calendar-title-form input[name="event-name"]');
        // checks if the input is valid AND reports errors to the user.
        console.log(textBox.value);
        if(textBox.reportValidity()){
            this.props.onNameChange(textBox.value);
            this.setState({
                isEditing: false
            });
        }
    }

    cancelNameChangeHandler() {
        this.setState({
            isEditing: false
        });
    }

    render() {

        return (
            <div className="calendar-title-form">
                <h3>Calendar Settings</h3>
                    {
                        this.state.isEditing == true ? (
                        <div className="row">
                            <div className="col span-2-of-7">
                                <label for="event-name">Calendar Name: </label>
                            </div>
                            <div className="col span-4-of-7">
                                <input name="event-name" type="text" maxLength="100" required />
                            </div>
                            <div className="col span-1-of-7">
                                <button type="button" onClick={this.nameChangeHandler}><i className="ion-ios-checkmark"></i></button>
                            </div>
                        </div> ) : (
                        <div className="row">
                            <div className="col span-2-of-7">
                                <label for="event-name">Calendar Name: </label>
                            </div>
                            <div className="col span-5-of-7">
                                <p>{this.props.calendarName}<button type="button" onClick={this.isEditingHandler}><i className="ion-compose"></i></button></p>
                            </div>
                        </div>
                        )
                    }
            </div>
        );
    }
}
