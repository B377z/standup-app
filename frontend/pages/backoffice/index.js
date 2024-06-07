// frontend/pages/backoffice/index.js
import Link from 'next/link';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const BackOffice = () => {
  return (
    <BackOfficeLayout>
      <h1>Back Office</h1>
      <ul>
        <li><Link href="/backoffice/proposals">Review Proposals</Link></li>
        <li><Link href="/backoffice/agenda">Agenda Items</Link></li>
        <li><Link href="/backoffice/notifications">Notifications</Link></li>
        <li><Link href="/backoffice/events">Events</Link></li>
        <li><Link href="/backoffice/attendees">Attendees</Link></li>
      </ul>
    </BackOfficeLayout>
  );
};

export default BackOffice;



