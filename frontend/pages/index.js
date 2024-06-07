// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Conference Site</h1>
      <nav>
        <ul>
          <li><Link href="/submitProposal">Submit a Proposal</Link></li>
          <li><Link href="/events">View Events</Link></li>
          <li><Link href="/register">Register for Events</Link></li>
        </ul>
      </nav>
    </div>
  );
}
