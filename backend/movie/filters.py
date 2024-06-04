
from rest_framework.filters import BaseFilterBackend
from django.contrib.postgres.search import TrigramSimilarity

class TrigramSimilarityFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        search_input = request.GET.get('movies-search')
        if search_input:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('title', search_input)
            ).filter(similarity__gt=0.3).order_by('-similarity')
        return queryset
