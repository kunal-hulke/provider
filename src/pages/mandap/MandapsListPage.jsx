  const filteredMandaps = mandaps.filter(mandap => {
    const matchesSearch = mandap.mandapName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mandap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mandap.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'high-capacity' && mandap.guestCapacity >= 400) return matchesSearch;
    if (filter === 'medium-capacity' && mandap.guestCapacity < 400 && mandap.guestCapacity >= 200) return matchesSearch;
    if (filter === 'low-capacity' && mandap.guestCapacity < 200) return matchesSearch;
    
    return false;
  });