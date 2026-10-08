const videos = [
  { name: 'Smart Home Setup', platform: 'Instagram Reels', views: '482K', ctr: '7.8%', status: 'Good' },
  { name: 'Desk Productivity Upgrade', platform: 'TikTok', views: '366K', ctr: '6.4%', status: 'Watch' },
  { name: 'Product Launch Story', platform: 'YouTube Shorts', views: '521K', ctr: '8.2%', status: 'Good' },
  { name: 'Feature Comparison', platform: 'Facebook', views: '294K', ctr: '5.9%', status: 'Review' },
  { name: 'Behind the Build', platform: 'LinkedIn', views: '198K', ctr: '4.8%', status: 'Review' }
];

const tbody = document.getElementById('videoTableBody');

if (tbody) {
  tbody.innerHTML = videos
    .map((video) => {
      const statusClass =
        video.status === 'Good'
          ? 'good'
          : video.status === 'Watch'
            ? 'watch'
            : 'review';

      return `
        <tr>
          <td>
            <div class="video-name">
              <span class="thumb" aria-hidden="true"></span>
              <span>${video.name}</span>
            </div>
          </td>
          <td>${video.platform}</td>
          <td>${video.views}</td>
          <td>${video.ctr}</td>
          <td><span class="status ${statusClass}">${video.status}</span></td>
        </tr>
      `;
    })
    .join('');
}
