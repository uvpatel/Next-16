#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<vector<int>> v={{1,2,3},{4,5,6},{7,8,9}};

    int n=v.size();
    int m=v[0].size();

    vector<int> ans(n*m);
    int i=0,j=0,l=0;
    for (int k = 0; k < n*m; k++)
    {
        while(j<m){
            ans[l]=v[i][j];
            j++;
            l++;
            if(j==m-1){
                i++;
                j--;
            }
        }
        while(i<n){
            ans[l]=v[i][j];
            i++;
            if(i==n-1){
                i--;
            }
        }
        whil
    }
    
}