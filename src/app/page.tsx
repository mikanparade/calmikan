import Calendar from './sections/Calendar';
import Topbar from './sections/Topbar';

export default function Home() {
  return (
    <main>
      <Topbar />
      <Calendar dateSelected={new Date()} />
      {/* <EventEditor></EventEditor> */}
    </main>
  );
}
