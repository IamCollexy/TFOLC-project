const filterStatus = (salesDelivery) => {
  const availableDeliveryJobs = salesDelivery.filter(
    (item) => item.salesDeliveryStatus === 'Available'
  );
  const activeDeliveryJobs = salesDelivery.filter(
    (item) => item.salesDeliveryStatus === 'In Transit'
  );
  const completedDeliveryJobs = salesDelivery.filter(
    (item) => item.salesDeliveryStatus === 'Completed'
  );
  const cancelledDeliveryJobs = salesDelivery.filter(
    (item) => item.salesDeliveryStatus === 'Pending'
  );
  const pendingDeliveryJobs = salesDelivery.filter(
    (item) => item.salesDeliveryStatus === 'Cancelled'
  );

  return {
    availableDeliveryJobs,
    activeDeliveryJobs,
    completedDeliveryJobs,
    cancelledDeliveryJobs,
    pendingDeliveryJobs,
  };
};

export default filterStatus;
