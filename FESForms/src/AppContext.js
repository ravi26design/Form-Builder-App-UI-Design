import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_FORMS, defaultOpts, placeholderFor } from './data';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

let fieldSeq = 1000;

export function AppProvider({ children }) {
  const [role, setRole] = useState('Super Admin');
  const [authed, setAuthed] = useState(false);
  const [forms, setForms] = useState(SEED_FORMS);

  // The form currently open in the builder (draft being edited)
  const [draft, setDraft] = useState(null);

  const isFieldUser = role === 'Field User';

  const login = useCallback(async (selectedRole) => {
    setRole(selectedRole);
    setAuthed(true);
    try {
      await AsyncStorage.setItem('fes_role', selectedRole);
      await AsyncStorage.setItem('fes_auth', '1');
    } catch (e) {}
  }, []);

  const logout = useCallback(async () => {
    setAuthed(false);
    try {
      await AsyncStorage.multiRemove(['fes_role', 'fes_auth']);
    } catch (e) {}
  }, []);

  const toggleStar = useCallback((id) => {
    setForms((prev) => prev.map((f) => (f.id === id ? { ...f, star: f.star ? 0 : 1 } : f)));
  }, []);

  // ---- Builder draft operations ----
  const newDraft = useCallback(() => {
    setDraft({
      id: 'new',
      n: '',
      d: '',
      prog: '',
      cat: 'water',
      fields: [],
      mode: 'new',
    });
  }, []);

  const editDraft = useCallback((form) => {
    setDraft({
      ...form,
      mode: 'edit',
      fields:
        form.fields && form.fields.length
          ? form.fields
          : buildStarterFields(form),
    });
  }, []);

  const addField = useCallback((type) => {
    setDraft((d) => {
      if (!d) return d;
      const field = makeField(type);
      return { ...d, fields: [...d.fields, field] };
    });
  }, []);

  const updateField = useCallback((fieldId, patch) => {
    setDraft((d) => {
      if (!d) return d;
      return { ...d, fields: d.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)) };
    });
  }, []);

  const removeField = useCallback((fieldId) => {
    setDraft((d) => (d ? { ...d, fields: d.fields.filter((f) => f.id !== fieldId) } : d));
  }, []);

  const moveField = useCallback((fieldId, dir) => {
    setDraft((d) => {
      if (!d) return d;
      const idx = d.fields.findIndex((f) => f.id === fieldId);
      const to = idx + dir;
      if (idx < 0 || to < 0 || to >= d.fields.length) return d;
      const fields = [...d.fields];
      const [item] = fields.splice(idx, 1);
      fields.splice(to, 0, item);
      return { ...d, fields };
    });
  }, []);

  const patchDraft = useCallback((patch) => setDraft((d) => (d ? { ...d, ...patch } : d)), []);

  const publishDraft = useCallback(() => {
    setDraft((d) => {
      if (!d) return d;
      setForms((prev) => {
        if (d.mode === 'edit') {
          return prev.map((f) => (f.id === d.id ? { ...f, ...d, s: 'active' } : f));
        }
        const newForm = {
          id: 'f' + Date.now(),
          n: d.n || 'Untitled Form',
          d: d.d || 'New form',
          v: 'v1.0',
          prog: d.prog || 'Unassigned',
          org: 'India Observatory',
          cat: d.cat || 'water',
          ind: [],
          s: 'active',
          r: 0,
          by: 'You',
          dt: '2026-07-24',
          mod: 'just now',
          star: 0,
          fields: d.fields,
        };
        return [newForm, ...prev];
      });
      return d;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isFieldUser,
        authed,
        login,
        logout,
        forms,
        toggleStar,
        draft,
        newDraft,
        editDraft,
        addField,
        updateField,
        removeField,
        moveField,
        patchDraft,
        publishDraft,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function makeField(type) {
  return {
    id: 'fld' + fieldSeq++,
    type,
    label: 'New ' + type,
    ph: placeholderFor(type),
    help: '',
    required: false,
    opts: defaultOpts(type),
    isSection: type === 'Section',
  };
}

// Give an edited form a realistic starter field set so the builder isn't empty
function buildStarterFields(form) {
  return [
    { id: 'fld' + fieldSeq++, type: 'Section', label: 'General Information', isSection: true },
    { id: 'fld' + fieldSeq++, type: 'Short Text', label: 'Village/Community Name', ph: 'Enter village name', required: true },
    {
      id: 'fld' + fieldSeq++,
      type: 'Dropdown',
      label: 'Primary Category',
      ph: 'Select one',
      required: true,
      opts: ['Option A', 'Option B', 'Option C'],
    },
    { id: 'fld' + fieldSeq++, type: 'Number', label: 'Measurement Value', ph: 'Enter value', required: false },
    { id: 'fld' + fieldSeq++, type: 'Photo Upload', label: 'Site Photo', required: false },
    { id: 'fld' + fieldSeq++, type: 'Location', label: 'GPS Location', required: true },
  ];
}
