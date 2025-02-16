import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";
import { collections, db } from "./firebaseconfig";
import { removeNullKeys } from "./helpers.tsx";

export const getDataById = async (table: any, documentId: any) => {
  const documentRef = doc(db, table, documentId);

  try {
    const document = await getDoc(documentRef);

    if (document.exists()) {
      return { ...document.data(), info: { id: document.id, table } };
    } else {
      throw new Error(`No document found with ID: ${documentId}`);
    }
  } catch (err) {
    return err;
  }
};

export const getData = async (table: any, userId?: any) => {
  let collectionRef = collection(db, table);

  try {
    const data = await getDocs(collectionRef);

    const actualData = data.docs;
    const newData = [];
    for (let i = 0; i < actualData.length; i++) {
      const doc = actualData[i];
      const hasUser = doc.data()?.user;
      let datas = { ...doc.data() };
      if (hasUser) {
        const userData = await getData(collections.USERS);

        if (Array.isArray(userData)) {
          datas["user"] = userData?.find((users: any) => {
            return users.info.id === hasUser;
          });
        }
      }
      newData.push({ ...datas, info: { id: doc.id, table: table } });
    }

    if (userId) {
      return newData.filter((items: any) => {
        return items?.user?.info?.id === userId;
      });
    } else {
      return newData;
    }
  } catch (err) {
    return err;
  }
};

export const addData = async (table: any, data: any, userId?: any) => {
  let dataRef = collection(db, table);

  try {
    const response = await addDoc(
      dataRef,
      removeNullKeys({
        ...data,
        createdAt: moment().utc().format(),
        user: userId,
      })
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateData = async (table: any, data: any, docId: any) => {
  let dataRef = doc(db, table, docId);

  try {
    await updateDoc(dataRef, { ...data, lastUpdated: moment().utc().format() });
  } catch (err) {
    return err;
  }
};

export const deleteData = async (table: any, docId: any) => {
  let dataRef = doc(db, table, docId);

  try {
    await deleteDoc(dataRef);
  } catch (err) {
    return err;
  }
};
