/* eslint-disable no-undef */
import { auth, firestore } from '../config'

/* ------------------------------------------------------------------------------------------
                                    Auth Queries
-------------------------------------------------------------------------------------------- */
// Register
auth.createUserWithEmailAndPassword(email, password)
// Sign In
auth.signInWithEmailAndPassword(email, password)

/* ------------------------------------------------------------------------------------------
                                    GET Queries
-------------------------------------------------------------------------------------------- */
// Get User Info
auth.onAuthStateChanged(user => {})

// Get Genre soted by Popularity
firestore.collection('Genre').orderBy('frequency', 'desc').get()
// Get Offers soted by Off
firestore.collection('Offer').orderBy('off', 'desc').get()
// Get Top Rated Dvd
firestore.collection('Genre').orderBy('Dvd', 'rating').get()
// Get Dvd soted by Popularity
firestore.collection('Genre').orderBy('Dvd', 'frequency').get()
// Get Dvd sorted by recent Upload
firestore.collection('Genre').orderBy('Dvd', 'published').get()
// Get Customer Info
firestore.collection('Customer').doc('customer-doc-uid').get()
// Get Dvd Info w.r.t Title
firestore.collection('Dvd').where('title', '==', valueString).limit(1).get()
// Get Dvd Info w.r.t Genre
firestore.collection('Dvd').where('Genre', 'array-contains-any', valueArray).get()
// Get Kiosk Info w.r.t dvd_title
firestore.collection('Kiosk').where('dvd_title', '==', valueString).limit(1).get()
// Get Offer Info w.r.t code
firestore.collection('Offer').where('code', '==', valueNumber).limit(1).get()
// Get RentedDvd Info w.r.t customer_uid, dvd_title, status
firestore.collection('RentedDvd')
  .where('customer_uid', '==', valueString)
  .where('dvd_title', '==', valueString)
  .where('status', '==', 'pending').limit(1).get()
// Get RentedDvd Info w.r.t customer_uid order by rent_date
firestore.collection('RentedDvd').where('customer_uid', '==', Store.getters['Main/user'].uid).orderBy('rent_date').get()
// Get RentedDvd Info w.r.t customer_uid, rent_date order by rent_date
firestore.collection('RentedDvd')
  .where('customer_uid', '==', Store.getters['Main/user'].uid)
  .where('rent_date', '>=', timeStamp).orderBy('rent_date').get()

/* ------------------------------------------------------------------------------------------
                                    SET Queries
-------------------------------------------------------------------------------------------- */

// Set Customer Info
firestore.collection('Customer').doc('customer-doc-uid')
  .set({
    uid: user.uid,
    name: name,
    email: email || user.email,
    frequency: 0
  })
// Insert RentedDvd
firestore.collection('RentedDvd').add({
  customer_uid: Store.getters['Main/user'].uid,
  dvd_title: dvdInfo.title,
  image_url: dvdInfo.image_url,
  fees: rent,
  late_fees: 0,
  rent_date: Date.now(),
  rent_period: days,
  return_date: null,
  status: 'pending'
})

/* ------------------------------------------------------------------------------------------
                                    Update Queries
-------------------------------------------------------------------------------------------- */
// Update Customer
firestore.collection('Customer').doc(Store.getters['Main/user'].uid).update({ name, phone, birthDate })
firestore.collection('Customer').doc(doc.uid).update({ frequency })
// Update Dvd
firestore.collection('Dvd').doc(doc.uid).update({ frequency })
// Update Genre
firestore.collection('Dvd').doc(doc.uid).update({ frequency })
// Update Kiosk
firestore.collection('Kiosk').doc(e.id).update({
  kiosk_east: kiosk === 'Kiosk East' ? e.data().kiosk_east - 1 : e.data().kiosk_east,
  kiosk_west: kiosk === 'Kiosk West' ? e.data().kiosk_west - 1 : e.data().kiosk_west,
  kiosk_north: kiosk === 'Kiosk North' ? e.data().kiosk_north - 1 : e.data().kiosk_north,
  kiosk_south: kiosk === 'Kiosk South' ? e.data().kiosk_south - 1 : e.data().kiosk_south
})
// Updaet RentedDvd
firestore.collection('RentedDvd').doc(dvdInfo.rentedDvdUid).update({
  return_date: Date.now(),
  fees: dvdInfo.fees + lateFee,
  late_fees: lateFee,
  late_return: lateReturn > 0 ? lateReturn : 0,
  status: 'clear'
})
// Updaet Kiosk
ref.update({ kiosk_east: dvdInfo.kiosk_east + 1 })
ref.update({ kiosk_west: dvdInfo.kiosk_west + 1 })
ref.update({ kiosk_north: dvdInfo.kiosk_north + 1 })
ref.update({ kiosk_south: dvdInfo.kiosk_south + 1 })
