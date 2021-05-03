import { auth, googleProvider, githubProvider } from "../firebase";

export const signInWithGoogle = async () => {
  let user;
  await auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
      user = res.user;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return user;
};

export const signInWithGithub = async () => {
  let user;
  await auth
    .signInWithPopup(githubProvider)
    .then((res) => {
      console.log(res.user);
      user = res.user;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return user;
};

export const logout = async () => {
  let logout_sucess;
  await auth
    .signOut()
    .then(() => {
      logout_sucess = true;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return logout_sucess;
};
