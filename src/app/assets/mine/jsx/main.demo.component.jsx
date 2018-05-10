// DemoWindow is the root React component, which renders all the other
// components and contains the state for the program.
//
// Props
// -----
// For the purpose of this demo if takes in a small array of events and a string
// for a name, and it uses a global variable to keep unique ids. These are all
// things that would generally be handled server side.
class DemoWindow extends React.Component {

    constructor(props) {
        super(props);
        this.selectAdminMode = this.selectAdminMode.bind(this);
        this.selectUserMode = this.selectUserMode.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.deleteEventHandler = this.deleteEventHandler.bind(this);
        this.eventCreationHandler = this.eventCreationHandler.bind(this);
        this.state = {
            mode: 'user',
            calendarName: this.props.calendarName,
            events: this.props.events
        };
    }

    componentDidMount() {
        const newEvents = this.state.events.filter(event => true);
        newEvents.sort((a, b) => {
        	var c = new Date(a.date);
        	var d = new Date(b.date);
        	return c-d;
        });
        this.setState({
            events: newEvents
        });
    }

    selectAdminMode(e) {

        const userBtn = document.querySelector('div.demo-nav button:first-child');
        const adminBtn = document.querySelector('div.demo-nav button:last-child');

        userBtn.classList.add('inactive-nav-btn');
        userBtn.classList.remove('active-nav-btn');
        adminBtn.classList.add('active-nav-btn');
        adminBtn.classList.remove('inactive-nav-btn');

        this.setState({
            mode: 'admin'
        });
    }

    selectUserMode(e) {

        const userBtn = document.querySelector('div.demo-nav button:first-child');
        const adminBtn = document.querySelector('div.demo-nav button:last-child');

        userBtn.classList.add('active-nav-btn');
        userBtn.classList.remove('inactive-nav-btn');
        adminBtn.classList.add('inactive-nav-btn');
        adminBtn.classList.remove('active-nav-btn');

        this.setState({
            mode: 'user'
        });
    }


    nameChangeHandler(newName) {
        this.setState({
            calendarName: newName
        });
    }

    deleteEventHandler(uuid){
        const newState = this.state.events.filter(event => event.uuid != uuid);
        this.setState({
            events: newState
        });
    }

    eventCreationHandler(eventObj){
        const newEvents = this.state.events.filter(event => true);
        newEvents.push(eventObj);
        newEvents.sort((a, b) => {
        	var c = new Date(a.date);
        	var d = new Date(b.date);
        	return c-d;
        });
        this.setState({
            events: newEvents
        });
    }

    render() {
        const events = this.state.events;
        const calendarName = this.state.calendarName;
        let calendarTitleFormContent = '', createEventForm = '';
        if (this.state.mode == 'admin') {
            calendarTitleFormContent = <SettingsPanel calendarName={calendarName} mode={this.state.mode} onNameChange={this.nameChangeHandler} />;
            createEventForm = <CreateEventForm onEventCreation={this.eventCreationHandler}/>;
        };

        return (
            <section className="demo-section">

                <div className="demo-nav">
                    <button type="button" className="nav-btn active-nav-btn" onClick={this.selectUserMode}>USER VIEW</button>
                    <button type="button" className="nav-btn inactive-nav-btn" onClick={this.selectAdminMode}>ADMIN VIEW</button>
                </div>

                <div className="view-container">

                     <div className="admin-container">

                         <div className="row">
                            {calendarTitleFormContent}
                        </div>

                        <div className="row">
                           {createEventForm}
                       </div>

                        <div className="events">
                            <Calendar calendarName={calendarName} events={events} mode={this.state.mode} onEventDelete={this.deleteEventHandler} />
                        </div>

                    </div>
                </div>

            </section>
        );
    }
}

//
// calendar JS entry point
//
var EVENT_UUID = 1007;
const calendarName = 'My Awesome Calendar';
const events = [
    {"name": "Learn to Cook Perfect Pasta!", "date": "08-04-2018", "description": "eu massa scelerisque tincidunt. Donec mattis lacus nisi", "uuid": "1003"},
    {"name": "Annual Christmas Eve Charity Dinner", "date": "12-24-2018", "description": ", ultricies pretium dolor pharetra vel. Integer posuere nulla purus, at ", "uuid": "1006"},
    {"name": "Cooking on a Budget", "date": "04-06-2018", "description": "leo ornare rhoncus id nec massa. In venenatis et leo ut finibus. Nullam urna lectus,", "uuid": "1002"},
    {"name": "The Secrets of Cooking Super Foods", "date": "03-12-2018", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et neque sit amet", "uuid": "1000"},
    {"name": "Baking Demystified", "date": "10-14-2018", "description": "dapibus mauris efficitur quis. Cras vel lorem lacinia odio luctus ornare.", "uuid": "1005"},
    {"name": "Cooking Fowl For Complete Begginers", "date": "03-21-2018", "description": "lacinia at turpis non, placerat euismod neque. In commodo laoreet leo ut", "uuid": "1001"}
];

ReactDOM.render(
    <DemoWindow events={events} calendarName={calendarName} />,
    document.getElementById('root')
);
