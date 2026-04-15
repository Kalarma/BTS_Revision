rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Chaque utilisateur peut lire/écrire son propre doc
    // L'admin (zaogirardot@gmail.com) peut tout lire
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.email == 'zaogirardot@gmail.com';

      match /progress/{courseId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
        allow read: if request.auth != null && request.auth.token.email == 'zaogirardot@gmail.com';
      }
    }

    // Rooms Kahoot — lisibles par tous les connectés
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;
    }

    // Leaderboard — lecture pour tous les connectés, écriture uniquement par le propriétaire
    match /leaderboard/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }

  }
}
