import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    company: '',
    itemsDelivered: 5,
    delivered: false,
    deliveryTime: '2024-02-03T10:30:00',
    completed: false,
    remark: 'Delivery in progress',
    statusColor: 'Green',
    archived: false,
    customer: 'Mr Bands',
    address: '123 Main St, Cityville',
    state: 'Abuja',
    employee: 'Alice Smith',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: '12345',
    salesOrder: '98765',
    deliveryAgent: '',
    deliveryAmount: 50.0,

    items: [
      {
        id: 1,
        description: 'CrankShaft Big Engine',
        qtyExpected: 100,
        qtyDelivered: 80,
        unitPrice: 10.5,
        discount: 2.5,
        amount: 800.0,
        delivered: true,
        deliveryAmount: 50.0,
        archived: false,
      },
    ],
  },
  {
    id: 2,
    company: '',
    itemsDelivered: 10,
    delivered: false,
    deliveryTime: '2024-02-04T09:00:00',
    completed: true,
    remark: '',
    statusColor: 'Blue',
    archived: false,
    customer: 'Jane Doe',
    address: '456 Elm St, Townsville',
    state: 'Lagos',
    employee: 'Bob Johnson',
    salesDeliveryStatus: 'Delivered',
    salesDeliveryType: '54321',
    salesOrder: '67890',
    deliveryAgent: '',
    deliveryAmount: 75.0,
    items: [
      {
        id: 2,
        description: 'Piston Assembly',
        qtyExpected: 50,
        qtyDelivered: 40,
        unitPrice: 8.0,
        discount: 0.0,
        amount: 320.0,
        delivered: true,
        deliveryAmount: 75.0,
        archived: false,
      },
    ],
  },
  {
    id: 3,
    company: '',
    itemsDelivered: 2,
    delivered: true,
    deliveryTime: '2024-02-05T14:45:00',
    completed: false,
    remark: 'Delivery in progress',
    statusColor: 'Yellow',
    archived: true,
    customer: 'Jack Smith',
    address: '789 Oak St, Villagetown',
    state: 'Cross River',
    employee: 'Eve Brown',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: 'ABCDE',
    salesOrder: 'FGHIJ',
    deliveryAgent: '',
    deliveryAmount: 60.0,
    items: [
      {
        id: 3,
        description: 'Gearbox Assembly',
        qtyExpected: 20,
        qtyDelivered: 18,
        unitPrice: 15.0,
        discount: 3.0,
        amount: 240.0,
        delivered: true,
        deliveryAmount: 60.0,
        archived: true,
      },
    ],
  },
  {
    id: 4,
    company: '',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: 'Delivery pending',
    statusColor: 'Orange',
    archived: false,
    customer: 'Sarah Johnson',
    address: '321 Pine St, Countryside',
    state: 'Rivers',
    employee: 'Tom Wilson',
    salesDeliveryStatus: 'In-Transit',
    salesDeliveryType: 'ABCDE',
    salesOrder: 'FGHIJ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    items: [
      {
        id: 4,
        description: 'Widget X',
        qtyExpected: 10,
        qtyDelivered: 0,
        unitPrice: 5.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
  {
    id: 5,
    company: '',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: 'Delivery cancelled by customer',
    statusColor: 'Red',
    archived: false,
    customer: 'Michael Brown',
    address: '987 Maple St, Suburbia',
    employee: 'Emily White',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: 'ZYXWV',
    salesOrder: 'UTSRQ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    state: 'Imo',
    items: [
      {
        id: 5,
        description: 'Widget Z',
        qtyExpected: 15,
        qtyDelivered: 0,
        unitPrice: 10.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
  {
    id: 6,
    company: 'Baka Rides',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: '',
    statusColor: 'Red',
    archived: false,
    customer: 'Governor Landing',
    address: '987 Maple St, Suburbia',
    state: 'Ogun',
    employee: 'Esther Mendez',
    salesDeliveryStatus: 'Assigned',
    salesDeliveryType: 'ZYXWV',
    salesOrder: 'UTSRQ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    items: [
      {
        id: 6,
        description: 'Widget Z',
        qtyExpected: 15,
        qtyDelivered: 0,
        unitPrice: 10.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
  {
    id: 7,
    company: '',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: '',
    statusColor: 'Red',
    archived: false,
    customer: 'Customer',
    address: '987 Maple St, Suburbia',
    state: 'Abuja',
    employee: 'Emily White',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: 'ZYXWV',
    salesOrder: 'UTSRQ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    items: [
      {
        id: 7,
        description: 'Widget Z',
        qtyExpected: 15,
        qtyDelivered: 0,
        unitPrice: 10.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
  {
    id: 8,
    company: '',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: '',
    statusColor: 'Red',
    archived: false,
    customer: 'Jordan Pitch',
    address: '987 Maple St, Suburbia',
    state: 'Abuja',
    employee: 'Emily White',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: 'ZYXWV',
    salesOrder: 'UTSRQ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    items: [
      {
        id: 8,
        description: 'Widget Z',
        qtyExpected: 15,
        qtyDelivered: 0,
        unitPrice: 10.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
  {
    id: 9,
    company: '',
    itemsDelivered: 0,
    delivered: false,
    deliveryTime: null,
    completed: false,
    remark: '',
    statusColor: 'Red',
    archived: false,
    customer: 'Customer',
    address: '987 Maple St, Suburbia',
    state: 'Delta',
    employee: 'Emily White',
    salesDeliveryStatus: 'un-assigned',
    salesDeliveryType: 'ZYXWV',
    salesOrder: 'UTSRQ',
    deliveryAgent: '',
    deliveryAmount: 0.0,
    items: [
      {
        id: 9,
        description: 'Widget Z',
        qtyExpected: 15,
        qtyDelivered: 0,
        unitPrice: 10.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
      {
        id: 10,
        description: 'Widget Y',
        qtyExpected: 20,
        qtyDelivered: 0,
        unitPrice: 8.0,
        discount: 0.0,
        amount: 0.0,
        delivered: false,
        deliveryAmount: 0.0,
        archived: false,
      },
    ],
  },
];

const salesDeliverySlice = createSlice({
  name: 'salesDelivery',
  initialState,
  reducers: {
    updateSalesDelivery(state, action) {
      const { id, company } = action.payload;
      return state.map((delivery) => {
        if (delivery.id === id) {
          return {
            ...delivery,
            company,
            salesDeliveryStatus: 'Assigned',
          };
        }
        return delivery;
      });
    },

    removeFromAvailable(state, action) {
      const id = action.payload;
      return state.filter((delivery) => delivery.id !== id);
    },
    moveToInTransit(state, action) {
      const { id, agentName } = action.payload;
      const deliveryIndex = state.findIndex(
        (delivery) => delivery.id === id
      );
      if (deliveryIndex !== -1) {
        state[deliveryIndex] = {
          ...state[deliveryIndex],
          salesDeliveryStatus: 'In-Transit',
          deliveryAgent: agentName,
        };
      }
    },

    completeDelivery(state, action) {
      const id = action.payload;
      const deliveryIndex = state.findIndex(
        (delivery) => delivery.id === id
      );
      if (deliveryIndex !== -1) {
        state[deliveryIndex] = {
          ...state[deliveryIndex],
          salesDeliveryStatus: 'Completed',
        };
      }
    },
    customerConfirmDelivery(state, action) {
      const id = action.payload;
      const deliveryIndex = state.findIndex(
        (delivery) => delivery.id === id
      );
      if (deliveryIndex !== -1) {
        state[deliveryIndex] = {
          ...state[deliveryIndex],
          completed: true,
          salesDeliveryStatus: 'Delivered',
        };
      }
    },
  },
});

export const {
  updateSalesDelivery,
  removeFromAvailable,
  moveToInTransit,
  completeDelivery,
  customerConfirmDelivery,
} = salesDeliverySlice.actions;
export default salesDeliverySlice.reducer;
