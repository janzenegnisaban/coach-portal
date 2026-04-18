// ============================================================
// KaliArena — Auth helpers  |  ADMIN PORTAL
// ============================================================
const PORTAL_ROLE = 'admin';
const DASHBOARD   = 'dashboard.html';
const LOGIN_PAGE  = 'index.html';

async function requireRole() {
  if (!window.db) return null;
  const { data: { session } } = await window.db.auth.getSession();
  if (!session) { window.location.href = LOGIN_PAGE; return null; }

  const { data: profile, error } = await window.db
    .from('profiles')
    .select('id, first_name, last_name, email, roles, role')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) { await window.db.auth.signOut(); window.location.href = LOGIN_PAGE; return null; }

  const roles = profile.roles?.length ? profile.roles : [profile.role].filter(Boolean);
  if (!roles.includes('admin') && !roles.includes('super-admin')) {
    await window.db.auth.signOut();
    window.location.href = LOGIN_PAGE;
    return null;
  }
  return { session, profile, roles };
}

async function signIn(email, password) {
  const { data, error } = await window.db.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  const { data: profile } = await window.db
    .from('profiles').select('roles, role').eq('id', data.user.id).single();
  const roles = profile?.roles?.length ? profile.roles : [profile?.role].filter(Boolean);
  if (!roles.includes('admin') && !roles.includes('super-admin')) {
    await window.db.auth.signOut();
    return { error: `You don't have access to the Admin portal. Contact a Super Admin to grant you access.` };
  }
  return { data, error: null };
}

async function signOut() {
  await window.db.auth.signOut();
  window.location.href = LOGIN_PAGE;
}

async function redirectIfLoggedIn() {
  if (!window.db) return;
  const { data: { session } } = await window.db.auth.getSession();
  if (!session) return;
  const { data: profile } = await window.db
    .from('profiles').select('roles, role').eq('id', session.user.id).single();
  const roles = profile?.roles?.length ? profile.roles : [profile?.role].filter(Boolean);
  if (roles.includes('admin') || roles.includes('super-admin')) window.location.href = DASHBOARD;
}

// No token required — account is created as a plain user.
// A Super Admin must then assign the admin role via the super-admin panel.
async function signUp(email, password, firstName, lastName) {
  const { data, error } = await window.db.auth.signUp({
    email, password,
    options: {
      emailRedirectTo: window.location.origin + '/dashboard.html',
      data: { first_name: firstName, last_name: lastName },
    },
  });
  if (error) return { error: error.message };
  return { data, error: null };
}
