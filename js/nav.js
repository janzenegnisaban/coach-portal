// ============================================================
// KaliArena — Navigation  |  ADMIN PORTAL
// ============================================================
const NAV_ITEMS = [
  { label: 'Dashboard',     page: 'dashboard.html',     icon: 'layout-dashboard' },
  { label: 'All Accounts',  page: 'users.html',         icon: 'users' },
  { label: 'Notifications', page: 'notifications.html', icon: 'bell' },
  { label: 'Teams & Players',page: 'teams.html',        icon: 'users-2' },
  { label: 'Events',        page: 'events.html',        icon: 'calendar-days' },
  { label: 'Rankings',      page: 'rankings.html',      icon: 'trophy' },
];

const MOBILE_NAV = [
  { label: 'Home',     page: 'dashboard.html',     icon: 'layout-dashboard' },
  { label: 'Accounts', page: 'users.html',         icon: 'users' },
  { label: 'Notify',   page: 'notifications.html', icon: 'bell' },
  { label: 'Events',   page: 'events.html',        icon: 'calendar-days' },
  { label: 'Rankings', page: 'rankings.html',      icon: 'trophy' },
];

const ROLE_BADGE = `<span class="badge badge-red"><i data-lucide="shield" style="width:.75rem;height:.75rem;"></i> Admin</span>`;

function renderNav(currentPage) {
  const sidebarEl = document.getElementById('sidebar-nav');
  const mobileEl  = document.getElementById('mobile-nav');

  if (sidebarEl) {
    sidebarEl.innerHTML = NAV_ITEMS.map(n => `
      <a href="${n.page}" data-page="${n.page}" class="sidebar-nav-link ${currentPage === n.page ? 'active' : ''}">
        <i data-lucide="${n.icon}"></i>${escHtml(n.label)}
      </a>
    `).join('') +
    `<button onclick="signOut()" class="sidebar-nav-link" style="margin-top:.5rem;">
      <i data-lucide="log-out"></i>Sign out
    </button>`;
  }

  if (mobileEl) {
    mobileEl.innerHTML = MOBILE_NAV.map(n => `
      <a href="${n.page}" data-page="${n.page}" class="mobile-nav-item ${currentPage === n.page ? 'active' : ''}">
        <i data-lucide="${n.icon}"></i><span>${escHtml(n.label)}</span>
      </a>
    `).join('');
  }

  const badgeEl = document.getElementById('sidebar-badge');
  if (badgeEl) badgeEl.innerHTML = ROLE_BADGE;

  refreshIcons();
}
