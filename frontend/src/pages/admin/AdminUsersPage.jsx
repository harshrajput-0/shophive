import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roleBadgeClass } from '../../utils/badgeClasses.js';
import { fetchUsers, selectUsers, changeUserRole } from '../../store/slices/usersSlice.js';
import { showToast } from '../../store/slices/uiSlice.js';
import BackToHome from '../../components/ui/BackToHome';

const selectClass = 'rounded-lg border border-border-strong bg-bg-secondary px-3 py-2 text-[.85rem] text-text outline-none';

// The backend only ever accepts 'user' or 'vendor' here — it rejects
// 'admin' outright, and refuses to change an admin's role at all.
const ASSIGNABLE_ROLES = ['user', 'vendor'];

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = async (user, role) => {
    const result = await dispatch(changeUserRole({ id: user._id, role }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(showToast(`${user.name} is now ${role}`, 'ok'));
    } else {
      dispatch(showToast(result.payload || 'Could not update role', 'err'));
    }
  };

  return (
    <div>
      <BackToHome />
      <h1 className="mb-8.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">Users</h1>

      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <div key={u._id} className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-4">
            <div className="min-w-40 flex-1">
              <p className="font-bold text-text">{u.name}</p>
              <p className="text-[.83rem] text-text-secondary">{u.email}</p>
            </div>
            <span className={`rounded-full px-3.5 py-1.25 text-[.78rem] font-bold capitalize ${roleBadgeClass(u.role)}`}>
              {u.role}
            </span>
            {u.role === 'admin' ? (
              <span className="text-[.8rem] text-text-secondary">Admin role can't be changed here</span>
            ) : (
              <select className={selectClass} value={u.role} onChange={(e) => handleRoleChange(u, e.target.value)}>
                {ASSIGNABLE_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}