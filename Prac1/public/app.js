document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    const myposts = db.collection("posts").doc("firstpost");
    // const myproducts = db.collection("products")
    // const query = myproducts.where("price", ">=", 10);
    // query.get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //         console.log(doc.data());
    //     });
    // });
    // myposts.get().then(doc => {
    //     if (doc.exists) {
    //         const data = doc.data();
    //         console.log(data);
    //         document.write(`${data.title}` + `<br>` + `${data.views}`);
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch(err => {
    //     console.log("Error getting document", err);
    // });
    // myposts.onSnapshot(doc => {
    //     const data = doc.data();
    //     console.log(data);
    //     document.write(`${data.title}` + `<br>` + `${data.views}` + `<br>`);
    // });
    // myposts.onSnapshot(doc => {
    //     const data = doc.data();
    //     document.querySelector("#title").innerHTML = data.title;
    // });
})
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            console.log(user);
            document.write(`Hello ${user.displayName}`);
        })
        .catch(error => {
            console.log(error);
        });
}
function updatePost(e) {
    const db = firebase.firestore();
    const myposts = db.collection("posts").doc("firstpost");
    myposts.update({
        title: e.target.value,
        views: 100
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch(err => {
        console.log("Error updating document", err);
    });
}
function uploadFile(files) {
    const storageref = firebase.storage().ref();
    const horseref = storageref.child("Capture.PNG");
    console.log(horseref);
    const file = files.item(0);
    const task = horseref.put(file);
    task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        const url = downloadURL;
        console.log(url);
        document.querySelector("#imgUpload").setAttribute("src", url);
    });
    // task.then(snapshot => {
    //     console.log("--->> ", snapshot);
    // }).catch(err => {
    //     console.log(err);
    // });
}