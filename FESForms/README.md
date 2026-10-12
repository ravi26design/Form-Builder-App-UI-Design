# India Observatory Forms — Mobile App (Expo / React Native)

A native mobile app built from the FES Form Builder web app. It has two role-based
experiences that share one design system:

- **Field User** — Home, My Forms, multi-step Fill Form, Offline Sync, Profile
- **Admin** — Dashboard, Forms, drag-to-add Form Builder, Programs, Submissions,
  Analytics, Templates, Team, Integrations, Account, Help

Pick the role on the login screen (demo selector).

## Run it

You need Node.js 18+ installed first (this machine didn't have it).

```bash
cd FESForms
npm install
npx expo start
```

Then:
- Press `i` for the iOS simulator, `a` for Android, or scan the QR code with the
  **Expo Go** app on your phone.
- `npx expo start --web` runs it in a browser.

## Project structure

```
App.js                  Navigation (role-based tabs + stack)
src/
  theme.js              Design tokens (ported from the web app's CSS variables)
  data.js               Seed forms, programs, submissions, field palette, etc.
  components.js         Shared UI kit (Card, Btn, Badge, Input, Chip, …)
  Header.js             Gradient hero + stack headers
  AppContext.js         App state (role, forms, builder draft)
  FormCard.js           Reusable form card
  screens/              21 screens
```

## Notes
- No backend — all data is mocked in `src/data.js`.
- Icons use `@expo/vector-icons` (Ionicons).
- For a quick design preview without any tooling, open **`../mobile-app.html`**
  in a browser — it's a self-contained clickable mockup of the same app.
