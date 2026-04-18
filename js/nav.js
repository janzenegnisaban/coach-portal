// ============================================================
// KaliArena — Navigation  |  COACH PORTAL
// ============================================================
const NAV_ITEMS = [
  { label: 'Dashboard', page: 'dashboard.html', icon: 'layout-dashboard' },
  { label: 'Players',   page: 'players.html',   icon: 'users' },
  { label: 'Schedule',  page: 'schedule.html',  icon: 'calendar' },
  { label: 'Rankings',  page: 'rankings.html',  icon: 'trophy' },
  { label: 'Results',   page: 'results.html',   icon: 'bar-chart-3' },
  { label: 'Documents', page: 'documents.html', icon: 'file-text' },
  { label: 'Events',    page: 'events.html',    icon: 'calendar-days' },
  { label: 'Settings',  page: 'settings.html',  icon: 'settings' },
];

const MOBILE_NAV = [
  { label: 'Home',     page: 'dashboard.html', icon: 'layout-dashboard' },
  { label: 'Players',  page: 'players.html',   icon: 'users' },
  { label: 'Schedule', page: 'schedule.html',  icon: 'calendar' },
  { label: 'Rankings', page: 'rankings.html',  icon: 'trophy' },
  { label: 'More',     page: 'settings.html',  icon: 'settings' },
];

const ROLE_BADGE = `<span class="badge badge-primary"><i data-lucide="shield" style="width:.75rem;height:.75rem;"></i> Coach</span>`;

function renderNav(currentPage) {
  const sidebarEl = document.getElementById('sidebar-nav');
  const mobileEl  = document.getElementById('mobile-nav');

  if (sidebarEl) {
    sidebarEl.innerHTML = NAV_ITEMS.map(n => `
      <a href="${n.page}" data-page="${n.page}" class="sidebar-nav-link ${currentPage === n.page ? 'active' : ''}">
        <i data-lucide="${n.icon}"></i>${escHtml(n.label)}
      </a>
    `).join('') +
    `<button onclick="signOut()" class="sidebar-nav-link mt-2" style="margin-top:.5rem;">
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
